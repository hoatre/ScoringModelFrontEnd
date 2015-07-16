

var app, deps;
 var apptree;
 deps = ['treeGrid'];

(function () {
    app = angular.module("apptpbuser", []);
})();

 app.config(['$httpProvider', function($httpProvider){
    console.log($httpProvider.defaults.headers.common);
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    
    // $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
    // $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
     $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
     $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

}]);
 app.controller('headertpbuser', function ($scope, $http) {
	//loadheader($scope, $http);
 })
//load header
function loadheader($scope, $http)
{
	//$scope.name="quangh";
	$http.get(url_userlogin)
	.success(function (data) {
		$scope.userlogin = data;
		//alert($scope.userlogin._id);
	})
	$http.get(url_rolemodulesangular)
	.success(function (data) {
		$scope.rolemodules = data;
	})
}

//check role
function modulecheckroleaction($scope,$http,linkcontrol)
{
	$http.post(url_checkroleaction, {link:linkcontrol}).
	  success(function(data, status, headers, config) {
		for(var i=0;i<data.length;i++)
		{
			//alert(data[i].role.controlid);
			$(data[i].role.controlid).show();	
		}
	  }).
	  error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	});
}

function geturlid(url)
{
	var strarr;
	strarr=url.split('/');
	if(strarr.length>1)
	{
		var index=strarr.length-1
		return strarr[index];
	}
	return "";
}

function geturlidhtml(url)
{
	var strarr;
	strarr=url.split('?id=');
	if(strarr.length>1)
	{
		var index=strarr.length-1
		return strarr[index];
	}
	return "";
}

function geturlvaluehtml(url,parameter)
{
 var strarr;
 strarr=url.replace('&','?').split('?');
 if(strarr.length>1)
 {
	 for(var i=0;i<strarr.length;i++)
	 {
		 var strarr1=strarr[i].split('=');
		 if(strarr1.length>1)
		 {
			 for(var j=0;j<strarr1.length;j++)
			 {

				 if(strarr1[0]==parameter)
				 {
					 return strarr1[1];
				 }
			 }
		 }

	 }
 }
 return "";
}
//get menu top
function rolemodulesangular($scope,$http,url)
{
	$http.get(url)
	.success(function (data) {
		$scope.rolemodules = data;
	})
}
