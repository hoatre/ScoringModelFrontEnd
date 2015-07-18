/**
 * Created by quang on 7/9/2015.
 */


//load form list modellist
function modellistangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            //alert(data);
            $scope.modelinfos = data["ModelInfosList"];
        })
}



function modeldelete($scope,$http,url)
{
    $scope.modeldelete = function(index){

        $http.post(url, {id:$scope.modelinfos[index]._id}).
            success(function(data, status, headers, config) {
                //alert(data);
                window.location.assign("/model.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
}

function getmodeldetailangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            //alert(data);
            $scope.modeldetail = data["ModelInfosList"][0];
            $('#modeldetailstatus').show();
        })
}

function actionmodeldetailangular($scope,$http)
{
    $scope.save = function(){
        //alert(url);
        var url="";
        if(!$scope.formModel.$valid) {
            //alert("Form valid!");
            return;
        }
        var models={};
        var action=true;
        if(typeof $scope.modeldetail == 'undefined'||$scope.modeldetail._id =='')
        {
            //alert(url_modelinsertangular_scala);
            models={
                name : $scope.modeldetail.name,
                description: $scope.modeldetail.description,
                status:$scope.modeldetail.status
            };
            url = url_modelinsertangular_scala;
            //alert(models.name);
        }
        else
        {
            models={
                id : $scope.modeldetail._id,
                name : $scope.modeldetail.name,
                description: $scope.modeldetail.description,
                status:$scope.modeldetail.status
            };
            url = url_modelupdateangular_scala;
            if($scope.modeldetail.status!='draft')
            {
                action=checkweightrate($scope,$http,$scope.modeldetail._id);
            }
        }
        if(action)
        {
            $http.post(url, angular.toJson(models)).
            success(function(data, status, headers, config) {
                window.location.assign("/model.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }
}