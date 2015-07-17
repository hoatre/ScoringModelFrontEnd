

function modellistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
		.success(function (data) {
			//alert(data);
			$scope.modelinfos = data["ModelInfosList"];
		})
}

//load form list factorlist
function factorlistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.factors = data["FactorsList"];
	})
}

function modelChanged($scope,$http)
{
	$scope.modelChanged = function(id) {
		//alert(id);
		$http.post(url_factoroptionbymodelid_scala, {modelid: id}).
			success(function (data, status, headers, config) {
				//console.log(data["SUCCESS"]);
				//alert(data);
				$scope.factors = data["SUCCESS"];
			}).
			error(function (data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}
}

function factorChanged($scope,$http,url)
{
	$scope.factorChanged = function(id){
		for(var i=0;i<$scope.factors.length;i++)
		{
			if($scope.factors[i]._id==id)
			{
				//alert($scope.factors[i]["FactorOption"][0].FactorOptionName);
				$scope.factoroptions = $scope.factors[i]["FactorOption"];
			}
		}
   }
}

function getfactoroptiondetailangular($scope,$http,url,factorId,factorOptionId)
{
	//alert(url)
	$http.post(url, {factorId:factorId,factorOptionId:factorOptionId}).
		success(function(data, status, headers, config) {
			$scope.factoroptiondetail = data["FactorsOptionItem"];
			//alert($scope.factoroptiondetail.FactorOptionName);
			//alert($scope.modelinfodetail.name+"-->"+$scope.modelinfodetail.min);
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
}

function factoroptiondelete($scope,$http,url)
{
	$scope.factoroptiondelete = function(factorid,factoroptionid){
			//alert(factorid+":"+factoroptionid);
		$http.post(url, {idFactor:factorid,idFactorOption:factoroptionid}).
		  success(function(data, status, headers, config) {
			alert(data);
			//window.location.assign("/factoroptions.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}

function actionfactoroptiondetailangular($scope,$http)
{
	//alert($scope.groups._id
	$scope.save = function(){
		if(!$scope.formFartorOption.$valid) {
			alert("Form valid!");
			return;
		}
		var factoroptions={};
		var url='';
		if(typeof $scope.factoroptiondetail.FactorOptionId == 'undefined'||$scope.factoroptiondetail.FactorOptionId =='')
		{
			url=url_factoroptioninsert_scala;
			alert(url);
			factoroptions={
				FactorId:$scope.choiceFactor,
				FactorOptionName : $scope.factoroptiondetail.FactorOptionName,
				Description : $scope.factoroptiondetail.Description,
				Fatal : $scope.factoroptiondetail.Fatal,
				Score: $scope.factoroptiondetail.Score,
				Status:$scope.factoroptiondetail.Status
			};

		}
		else
		{
			url=url_factoroptionupdate_scala;
			alert(url);
			factoroptions={
				idFactor:$scope.choiceFactor,
				idFactorOption:$scope.factoroptiondetail.FactorOptionId,
				FactorOptionName : $scope.factoroptiondetail.FactorOptionName,
				Description : $scope.factoroptiondetail.Description,
				Fatal : $scope.factoroptiondetail.Fatal,
				Score: $scope.factoroptiondetail.Score,
				Status:$scope.factoroptiondetail.Status
			};

		}
		$http.post(url,  angular.toJson(factoroptions)).
		  success(function(data, status, headers, config) {
			window.location.assign("/factoroptions.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
}