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
            $scope.modelinfos = data;
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
            $scope.modeldetail = data;
        })
}

function actionmodeldetailangular($scope,$http,url)
{
    $scope.save = function(){
        //alert(url);
        $http.post(url, {modelinfos:$scope.modeldetail}).
            success(function(data, status, headers, config) {
                window.location.assign("/model.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
}