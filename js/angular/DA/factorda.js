//load form list factorlist
function factorlistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.factors = data;
	})
}

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

function getfactordetailangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.factordetail = data;
	})
}

function factordelete($scope,$http,url)
{
	$scope.factordelete = function(index){
			
		$http.post(url, {id:$scope.factors[index]._id}).
		  success(function(data, status, headers, config) {
			alert(data);
			window.location.assign("/factors.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}

function actionfactordetailangular($scope,$http,url)
{
	//alert($scope.groups._id);
	$scope.save = function(){
		if(!$scope.formFactor.$valid) {
			return;
		}
		$http.post(url, {factors:$scope.factordetail}).
		  success(function(data, status, headers, config) {
			window.location.assign("/factors.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
}