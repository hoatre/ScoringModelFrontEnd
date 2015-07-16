/**
 * Created by quang on 7/9/2015.
 */

app.controller('modelTestController', function ($scope, $http) {

    $scope.models = [];
    $scope.factors = [];
    $scope.rootFactors = [];
    $scope.selectModel = '';

    $scope.getAllModels = function(){
        $http.get(url_modelGetAll)
            .success(function (data) {
                console.log(data);
                $scope.models = data['ModelInfosList'];
            });
    }

    $scope.getFactorByModelId = function(modelId){

        $http.post(url_modelGetAllFactor, {id:modelId}).
            success(function(data, status, headers, config) {
                //console.log(data);
                $scope.factors = data['SUCCESS'];
                //$scope.rootFactors = $scope.getFactorByParentId('');
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
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
        console.log("parentId:" + parentId);
        console.info(result)
        return result;
    }

    $scope.getAllModels();
});