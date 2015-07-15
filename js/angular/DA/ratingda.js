/**
 * Created by quang on 7/12/2015.
 */


//load form list ratinglist
function ratinglistangular($scope,$http,url)
{
    $http.get(url)
        .success(function (data) {
            data.sort(function(a, b){
                return a.rating.scorefrom-b.rating.scorefrom;
            })
            $scope.ratings = data;
        })
}

function modellistangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            //alert(data);
            $scope.modelinfos = data;
        })
}

function modelChanged($scope,$http)
{
    $scope.modelChanged = function(id){
        //alert($scope.MODULE_CHOICE);
        for(var i=0;i<$scope.modelinfos.length;i++)
        {
            if($scope.modelinfos[i]._id==id)
            {
                $scope.modelinfodetail=$scope.modelinfos[i];
            }
        }
        //alert(url_ratinglistbymodelidangular);
        $http.get(url_ratinglistbymodelidangular+"/"+id)
        .success(function (data) {
            //alert(data);
            data.sort(function(a, b){
                return a.rating.scorefrom-b.rating.scorefrom;
            })
            $scope.ratings = data;
        })
    }
}

function ratingCheckRating($scope,$http)
{
    $scope.ratingCheckRating = function(){
        for(var i=0;i<($scope.ratings.length-1);i++)
        {
            if($scope.ratings[i].rating.scoreto!=$scope.ratings[i+1].rating.scorefrom)
            {
                alert("Rating in model false!");
                return false;
            }
        }
    }
}

function ratingAdd($scope,$http) {
    $scope.ratingAdd = function(){
        window.location.assign("/ratingdetail.html?modelid="+$scope.modelinfodetail._id);
    }
}

function ratingdelete($scope,$http,url)
{
    $scope.ratingdelete = function(index){

        $http.post(url, {id:$scope.ratings[index]._id}).
            success(function(data, status, headers, config) {
                alert(data);
                window.location.assign("/ratings.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
}

function getratingdetailangular($scope,$http,url)
{
    //alert($scope.MODULE_CHOICE);
    $http.get(url)
        .success(function (data) {
            $scope.ratings = data;
            getmodeldetailangular($scope,$http,url_modeldetailangular+"/"+data.rating.modelid);
        })
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

function actionratingdetailangular($scope,$http,url)
{
    $scope.save = function(){
        $scope.ratings.rating.modelid = $scope.modeldetail._id;
        $scope.ratings.rating.modelname = $scope.modeldetail.modelinfo.name;
        if(checkrating($scope,$http,$scope.ratings))
        {
            $http.post(url, {ratings:$scope.ratings}).
            success(function(data, status, headers, config) {
                window.location.assign("/ratings.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }
}


function checkrating($scope,$http,ratings)
{
    if(ratings.rating.scorefrom<ratings.rating.scoreto)
    {
        //alert('aaa1');
        //for(var i=0;i<$scope.modelinfos.length;i++)
        //{
            //alert($scope.modelinfos[i]._id);
            if($scope.modeldetail._id==ratings.rating.modelid)
            {
                //alert('aaa2');
                if($scope.modeldetail.modelinfo.minscore>ratings.rating.scorefrom)
                {
                    alert("Score form more than minscore of model!");
                    return false;
                }
                else
                {
                    if($scope.modeldetail.modelinfo.maxscore<ratings.rating.scoreto)
                    {
                        alert("Model maximum more than Score to!");
                    }
                    else
                    {
                        return true;
                    }
                }
            }
        //}
        /*$http.get(url_ratinglistbymodelidangular+"/"+ratings.rating.modelid)
        .success(function (data) {
            data.sort(function(a, b){
                return a.rating.scorefrom-b.rating.scorefrom;
            })

        })*/
    }
    else
    {
        alert("Score to more than score form!");
        return false;
    }
}