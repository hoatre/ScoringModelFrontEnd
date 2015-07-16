/**
 * Created by quang on 7/9/2015.
 */

app.controller('modelTestController', function ($scope, $http) {
    $scope.message = '';
    $scope.models = [];
    $scope.factors = [];
    $scope.selectModel = '';

    $scope.getAllModels = function(){
        $http.get(url_modelGetAll)
            .success(function (data) {
                //console.log(data);
                $scope.models = data['ModelInfosList'];
            });
    }

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
            });
    };

    $scope.getFactorByParentId = function(parentId){
        var result = [];

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
        console.info(options)

        $http.post(url_modelGetScore, options).
            success(function(data, status, headers, config) {
                //console.log(data);
                $scope.message = data;
            })
            .error(function(error, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.message = error;
            });
    };

    $scope.optionValidate = function () {
        var check = false;
        if ($('#frmMain input:radio:checked').length == 0) {
            alert('You must choose!');
            return false;
        }
        return true;
    }

    $scope.getOptions = function () {

        var result = '';
        $('#frmMain input:radio:checked').each(function () {
            result += "," + $(this).val();
        });
        //alert('{listresult: [' + result.substring(1) + ']}');

        return '{"modelid": "' + $scope.selectModel + '", "listresult":[' + result.substring(1) + ']}';
    }
    $scope.getAllModels();
});