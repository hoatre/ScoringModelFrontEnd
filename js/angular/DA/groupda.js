

//load form list grouplist
function grouplistangular($scope,$http,url)
{
	$http.get(url)
	.success(function (data) {
		$scope.groups = data;
	})
}

function groupdelete($scope,$http,url)
{
	$scope.groupdelete = function(index){
			
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

function getgroupdetailangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		$scope.groups = data;
	})
}

function actiongroupdetailangular($scope,$http,url)
{
	$scope.save = function(){
		$http.post(url, {groups:$scope.groups}).
		  success(function(data, status, headers, config) {
			window.location.assign("/grouplist.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
   }
}