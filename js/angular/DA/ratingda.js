/**
 * Created by quang on 7/12/2015.
 */


//load form list ratinglist
function ratinglistangular($scope,$http,url)
{
    /*$http.get(url)
        .success(function (data) {
            //alert(data["SUCCESS"][0]["codein"]);
            data["SUCCESS"][0]["codein"].sort(function(a, b){
                return a.rating.scorefrom-b.rating.scorefrom;
            })
            $scope.ratings = data["SUCCESS"][0]["codein"];
        })*/
}

function modellistangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            //alert(data);
            $scope.modelinfos = data["ModelInfosList"];
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
                //alert($scope.modelinfodetail.min);
            }
        }
        //alert(url_ratinglistbymodelidangular_scala+"/"+id);
        $http.get(url_ratinglistbymodelidangular_scala+"/"+id)
        .success(function (data) {
            //alert(data);
            /*data["SUCCESS"][0]["codein"].sort(function(a, b){
                return a.rating.scorefrom-b.rating.scorefrom;
            })
            $scope.ratings = data;*/
                //alert(data["SUCCESS"][0]["codein"].code)
                $scope.ratings = data["SUCCESS"][0]["codein"];
                $scope.modelforrating = data["SUCCESS"][0];
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

function gennerateScoringRange($scope,$http)
{
    $scope.gennerateScoringRange = function(index){
        //alert(url_modelrangerandupdateangular_scala);
        $http.post(url_modelrangerandupdateangular_scala, {id:$scope.modelinfodetail._id}).
            success(function(data, status, headers, config) {
                $scope.modelinfodetail = data["SUCCESS"];
                //alert($scope.modelinfodetail.name+"-->"+$scope.modelinfodetail.min);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

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
    //alert(url);
    $http.get(url)
        .success(function (data) {
            $scope.ratings = data["SUCCESS"]["codein"][0];
            $scope.ratingfull= data["SUCCESS"];
            //getmodeldetailangular($scope,$http,url_modeldetailangular_scala+"/"+data.rating.modelid);
        })
}

function getmodeldetailangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            //alert(data["ModelInfosList"]);
            $scope.modeldetail = data["ModelInfosList"][0];
        })
}

function actionratingdetailangular($scope,$http)
{
    $scope.save = function(){
        var url="";
        var ratingobj={};

        if(typeof $scope.ratingfull == 'undefined')
        {
            //alert(url_ratinginsertangular_scala);
            //alert($scope.ratingfull["codein"].length)
            var codein={
                code:$scope.ratings.code,
                scorefrom : $scope.ratings.scorefrom,
                scoreto : $scope.ratings.scoreto,
                status : $scope.ratings.status,
                statusname: $scope.ratings.statusname,
                note:$scope.ratings.note
            };
            ratingobj={
                modelid:$scope.modeldetail._id,
                codein:codein
            };
            url=url_ratinginsertangular_scala;
        }
        else{
            //alert(url_ratingupdatetangular_scala);
            ratingobj={
                modelid:$scope.modeldetail._id,
                code:$scope.ratings.code,
                scorefrom : $scope.ratings.scorefrom,
                scoreto : $scope.ratings.scoreto,
                status : $scope.ratings.status,
                statusname: $scope.ratings.statusname
            };
            url=url_ratingupdatetangular_scala;
        }
        alert(angular.toJson(ratingobj));
        if(checkrating($scope,$http,$scope.ratings))
        {
            $http.post(url, angular.toJson(ratingobj)).
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
    if(ratings.scorefrom<ratings.scoreto)
    {
        //alert('aaa1');
        //for(var i=0;i<$scope.modelinfos.length;i++)
        //{
            //alert($scope.modelinfos[i]._id);
            //if($scope.modeldetail._id==ratings.rating.modelid)
            //{
                //alert('aaa2');
                if($scope.modeldetail.minscore>ratings.scorefrom)
                {
                    alert("Score form more than minscore of model!");
                    return false;
                }
                else
                {
                    if($scope.modeldetail.maxscore<ratings.scoreto)
                    {
                        alert("Model maximum more than Score to!");
                    }
                    else
                    {
                        return true;
                    }
                }
            //}
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