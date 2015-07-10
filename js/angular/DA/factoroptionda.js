//load form list factoroptionlist
function factoroptionlistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.factoroptions = data;
	})
}

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

function factorChanged($scope,$http,url)
{
	$scope.factorChanged = function(index){
		//alert("factorChanged: "+index);
		//alert("factorChanged: "+index);
		if(index==""||index==" "||index==null)
		{
			//alert("factorChanged: "+index);
			$http.get(url_factoroptionlistangular)
				.success(function (data) {
					//alert(data);
					$scope.factoroptions = data;
				})
		}
		else
		{
			$http.post(url, {factorid:index}).
			  success(function(data, status, headers, config) {
				//alert(data);
				$scope.factoroptions = data;
			  }).
			  error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
		    });
		}
   }
}

function getfactoroptiondetailangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.factoroptions = data;
	})
}

function factoroptiondelete($scope,$http,url)
{
	$scope.factoroptiondelete = function(index){
			
		$http.post(url, {id:$scope.factoroptions[index]._id}).
		  success(function(data, status, headers, config) {
			alert(data);
			window.location.assign("/factoroptions.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}

function actionfactoroptiondetailangular($scope,$http,url)
{
	//alert($scope.groups._id
	$scope.save = function(){
		if(!$scope.formFartorOption.$valid) {
			return;
		}
		$http.post(url, {factoroptions:$scope.factoroptions}).
		  success(function(data, status, headers, config) {
			window.location.assign("/factoroptions.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
}