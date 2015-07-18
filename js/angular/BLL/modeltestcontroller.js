/**
 * Created by quang on 7/9/2015.
 */
(function () {
    "use strict";
    angular
        .module("apptpbuser", ['ngSanitize'])
    .controller('modelTestController', function ($scope, $http) {

        $scope.models = [];
        $scope.factors = [];
        $scope.ratings = [];
        $scope.selectModel = '';

        $scope.currentModel = {};

        $scope.message = '';
        $scope.messageClass = 'col-md-6 wel bg-info';

        $scope.getAllModels = function(){
            $http.get(url_modelGetAll)
                .success(function (data) {
                    //console.log(data);
                    $scope.models = data['ModelInfosList'];
                });
        };

        $scope.getModelByStatus = function(status){

            $http.post(url_modelGetByStatus, {status:status}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.models = data['SUCCESS'];
                })
                .error(function(error, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.message = error;
                    $scope.factors = [];
                });
        };

        $scope.getFactorByModelId = function(modelId){

            $http.post(url_modelGetAllFactor, {id:modelId}).
                success(function(data, status, headers, config) {
                    //console.log(data);
                    $scope.factors = data['SUCCESS'];
                })
                .error(function(error, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.message = error;
                    $scope.factors = [];
                });
        };

        $scope.getFactorByParentId = function(parentId){
            var result = [];

            if (!$scope.factors)
                return result;

            $scope.factors.forEach(function(element) {
                if (element.Parentid == parentId) {
                    //console.info(element);
                    result.push(element);
                }
            });
            //console.log("parentId:" + parentId);
            //console.info(result)
            return result;
        };

        $scope.submit = function(){
            var options = $scope.getOptions();
            //console.info(options)


            $http.post(url_modelGetScore, options).
                success(function(data, status, headers, config) {
                    //console.log(data);
                    if (data['Status'] == 'Approve') {
                        $scope.messageClass = 'col-md-6 wel bg-success';

                        $scope.message = "<h5 class='text-uppercase heading'><strong>Congratulations!</strong></h5><br/> Your loan is approved subject to confirmation of the details you have provided.<br /> Check your mail for next steps.<br /> (Score: " + data['Score'] +' ,Rating: '+ data['Rating'] + ' ,Status: ' + data['Status'] + ').';
                        console.log( $scope.message);
                    }
                    else if (data['Status'] == 'Underwriting'){
                        $scope.messageClass = 'col-md-6 wel bg-warning';

                        $scope.message = "<h5 class='text-uppercase heading'><strong>Underwriting:</strong></h5><br/>Underwriting! <br /> (Score: " + data['Score'] +' ,Rating: '+ data['Rating'] + ' ,Status: ' + data['Status'] + ').';

                    }
                    else if (data['Status'] == 'Reject'){
                        $scope.messageClass = 'col-md-6 wel bg-danger';
                        $scope.message = "<h5 class='text-uppercase heading'><strong>Reject:</strong></h5><br/>Reject! <br /> (Score: " + data['Score'] +' ,Rating: '+ data['Rating'] + ' ,Status: ' + data['Status'] + ').';

                    }
                    else {
                        $scope.messageClass = 'col-md-6 wel bg-info';
                        $scope.message = "<h5 class='text-uppercase heading'><strong>Warning:</strong></h5><br/>Please completed choose! <br /> (Score: " + data['Score'] +' ,Rating: '+ data['Rating'] + ' ,Status: ' + data['Status'] + ').';
                        //console.log(data);
                    }
                })
                .error(function(error, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.message = error;
                    console.log($scope.message);
                });
        };

        $scope.getRatingByModelId = function (modelId){
            $http.get(url_ratinglistbymodelidangular_scala+"/"+modelId)
                .success(function (data) {
                    //console.log(data);
                    if(typeof data["ERROR"]=='undefined')
                    {
                        $scope.ratings = data["SUCCESS"][0]["codein"];
                    }
                    else{
                        $scope.ratings = [];
                    }
                })
                .error(function(error, status, headers, config) {
                    $scope.ratings = [];
                });
        }

        $scope.cboModelChange = function (modelId){
            $scope.getFactorByModelId(modelId);
            $scope.getRatingByModelId(modelId);

            for(var i=0;i<$scope.models.length;i++)
            {
                if($scope.models[i]._id == modelId)
                {
                    $scope.currentModel = $scope.models[i];
                    console.log($scope.currentModel);
                    break;
                }
            }
        }

        $scope.optionValidate = function () {
            var check = false;
            if ($('#frmMain input:radio:checked').length == 0) {
                alert('You must choose!');
                return false;
            }
            return true;
        };

        $scope.getOptions = function () {
            var result = '';
            $('#frmMain input:radio:checked').each(function () {
                result += "," + $(this).val();
            });
            //alert('{listresult: [' + result.substring(1) + ']}');

            return '{"modelid": "' + $scope.selectModel + '", "listresult":[' + result.substring(1) + ']}';
        };


        //$scope.getAllModels();
    });
}());