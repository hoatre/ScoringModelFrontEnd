

//load form list grouplist
function grouplistangular($scope,$http,url)
{

	$http.get(url)
	.success(function (data) {
			//alert(data);
		$scope.groups = data["GroupsList"];
	})
}

function groupdelete($scope,$http,url)
{
	$scope.groupdelete = function(index){
		//alert(url);
		$http.post(url, {id:$scope.groups[index]._id}).
		  success(function(data, status, headers, config) {
			alert(data);
			window.location.assign("/grouplist.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}

function getgroupdetailangular($scope,$http,url,id)
{
	/*alert(url);
	$http.get(url)
	.success(function (data) {
			alert(data);
		$scope.groups = data;
	})*/
	//alert(url+"/"+geturlidhtml($location.absUrl()));
	$http.post(url, {id:id}).
		success(function(data, status, headers, config) {
			//alert(data);
			//window.location.assign("/grouplist.html")
			alert(data["GroupsList"][0]._id+":"+data["GroupsList"][0].group.groupname);
			$scope.groups = data["GroupsList"][0];
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
}

function actiongroupdetailangular($scope,$http,url)
{
	$scope.save = function(){
		//alert(url);
		//alert(angular.toJson($scope.groups));
		$http.post(url, $scope.groups).
		  success(function(data, status, headers, config) {
			window.location.assign("/grouplist.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
   }
}