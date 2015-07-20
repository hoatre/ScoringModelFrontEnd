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
            $http.post(url, angular.toJson(models)).
                success(function(data, status, headers, config) {
                    window.location.assign("/model.html")
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
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
                $http.post(url_checkweightrate_scala, {modelid:$scope.modeldetail._id}).
                    success(function(data, status, headers, config) {
                        //alert('data.checkweightrate.header.code');
                        var code =0;
                        code=data.checkweightrate.header.code;
                        var strerr="";
                        if(code==0)
                        {
                            //alert(data["checkweightrate"]["header"].message);
                            //$scope.statuscheck = true;

                            $http.post(url, angular.toJson(models)).
                                success(function(data, status, headers, config) {
                                    window.location.assign("/model.html")
                                }).
                                error(function(data, status, headers, config) {
                                    // called asynchronously if an error occurs
                                    // or server returns response with an error status.
                                });

                        }
                        else if(code==1)
                        {
                            strerr = data["checkweightrate"]["header"].message+":\n";
                            for(var i=0;i<data["checkweightrate"]["body"]["weight"].length;i++)
                            {
                                strerr+="- "+data["checkweightrate"]["body"]["weight"][i].FactorName+" : "+data["checkweightrate"]["body"]["weight"][i].Weight+"\n";
                            }
                            strerr += "------------------------------------------\n";
                            strerr += "- "+data["checkweightrate"]["body"].rate;
                            alert(strerr);
                            //$scope.statuscheck = false;
                        }
                        else if(code==2)
                        {
                            strerr = data["checkweightrate"]["header"].message+":\n";
                            for(var i=0;i<data["checkweightrate"]["body"]["weight"].length;i++)
                            {
                                strerr+="- "+data["checkweightrate"]["body"]["weight"][i].FactorName+" : "+data["checkweightrate"]["body"]["weight"][i].Weight+"\n";
                            }
                            alert(strerr);
                            //$scope.statuscheck = false;
                        }
                        else if(code==3)
                        {
                            strerr = data["checkweightrate"]["header"].message+":\n";
                            strerr += "- "+data["checkweightrate"]["body"].rate;
                            alert(strerr);
                            //$scope.statuscheck = false;
                        }
                        else if(code==4)
                        {
                            strerr = data["checkweightrate"]["header"].message+":\n";
                            alert(strerr);
                            //$scope.statuscheck = false;
                        }
                        //alert($scope.statuscheck)
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        //$scope.statuscheck = false
                    });
                //alert(checkweightrate($scope,$http,$scope.modeldetail._id));
            }
            else
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
        //alert($scope.statuscheck)
        /*if($scope.statuscheck)
        {
            $http.post(url, angular.toJson(models)).
            success(function(data, status, headers, config) {
                window.location.assign("/model.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }*/
    }
}