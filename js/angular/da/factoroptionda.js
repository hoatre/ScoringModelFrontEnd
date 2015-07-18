

function modellistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
		.success(function (data) {
			//alert(data);
			$scope.modelinfos = data["ModelInfosList"];
			//alert($scope.choiceFactor);
			if($scope.choiceModel!=''&&$scope.choiceFactor!='') {
				//alert('AAA');
				backmodelChanged($scope, $http, $scope.choiceModel, $scope.choiceFactor);
			}
		})
}

function modellistbymodelsatusangular($scope,$http,url)
{
	//alert(url);
	$http.post(url, {status:'draft'}).
		success(function(data, status, headers, config) {
			//alert(data);
			$scope.modelinfos = data["SUCCESS"];
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
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


function factorlistbymodelidangular($scope,$http,url,modelid)
{
	//alert(url);
	$http.post(url_factoroptionbymodelid_scala, {modelid: modelid}).
		success(function (data, status, headers, config) {
			//console.log(data["SUCCESS"]);
			//alert(data);
			if(typeof data["ERROR"]=='undefined')
			{
				$scope.factors = data["SUCCESS"];
			}
		}).
		error(function (data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
}

function modelChanged($scope,$http)
{
	$scope.modelChanged = function(id) {
		//alert(id);
		for(var i=0;i<$scope.modelinfos.length;i++)
		{
			if($scope.modelinfos[i]._id==id)
			{
				$scope.modelinfodetail=$scope.modelinfos[i];
				//alert($scope.modelinfodetail.min);
			}
		}
		//alert(url_ratinglistbymodelidangular_scala+"/"+id);
		if($scope.modelinfodetail.status=='draft')
		{
			$('#btnInsert').show();
		}
		else
		{
			$('#btnInsert').hide();
		}
		$http.post(url_factoroptionbymodelid_scala, {modelid: id}).
			success(function (data, status, headers, config) {
				//console.log(data["SUCCESS"]);
				//alert(data);
				$scope.factors=[];
				if(typeof data["ERROR"]=='undefined')
				{
					$scope.factors = data["SUCCESS"];
				}
			}).
			error(function (data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}
}

function backmodelChanged($scope,$http,modelid,factorid)
{
		//alert(id);
		for(var i=0;i<$scope.modelinfos.length;i++)
		{
			if($scope.modelinfos[i]._id==modelid)
			{

				$scope.modelinfodetail=$scope.modelinfos[i];
				//alert($scope.modelinfodetail.min);
			}
		}
		//alert(url_ratinglistbymodelidangular_scala+"/"+id);
		if($scope.modelinfodetail.status=='draft')
		{
			$('#btnInsert').show();
		}
		else
		{
			$('#btnInsert').hide();
		}

		$http.post(url_factoroptionbymodelid_scala, {modelid: modelid}).
			success(function (data, status, headers, config) {
				//console.log(data["SUCCESS"]);
				//alert(data);
				$scope.factors=[];
				if(typeof data["ERROR"]=='undefined')
				{
					$scope.factors = data["SUCCESS"];
					for(var i=0;i<$scope.factors.length;i++)
					{
						if($scope.factors[i]._id==factorid)
						{
							//alert($scope.factors[i]["FactorOption"][0].FactorOptionName);

							$scope.factoroptions = $scope.factors[i]["FactorOption"];

						}
					}
				}
			}).
			error(function (data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

}

function factorChanged($scope,$http)
{
	$scope.factorChanged = function(id){
		//alert(id)
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

function validatemodel($scope,$http)
{
	$scope.validatemodel = function(){
		//alert('aaa');
		checkweightrate($scope,$http,$scope.choiceModel);
	}
}

function getfactoroptiondetailangular($scope,$http,url,factorId,factorOptionId)
{
	//alert(factorId)
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
function factoroptionadd($scope,$http) {
	$scope.factoroptionadd = function() {
		window.location.assign("/factoroptiondetail.html?modelid=" + $scope.choiceModel+"&factorId="+$scope.choiceFactor);
	}
}

function factoroptiondelete($scope,$http,url)
{
	$scope.factoroptiondelete = function(factorid,factoroptionid){
			//alert(factorid+":"+factoroptionid);
		$http.post(url, {idFactor:factorid,idFactorOption:factoroptionid}).
		  success(function(data, status, headers, config) {
			//alert(data);
			//window.location.assign("/factoroptions.html")
				for(var i=0;i<$scope.factoroptions.length;i++)
				{
					if($scope.factoroptions[i].FactorOptionId==factoroptionid)
					{
						$scope.factoroptions.splice(i, 1);
					}
				}

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
			//alert("Form valid!");
			return;
		}
		var factoroptions={};
		var url='';
		if(typeof $scope.factoroptiondetail.FactorOptionId == 'undefined'||$scope.factoroptiondetail.FactorOptionId =='')
		{
			url=url_factoroptioninsert_scala;
			//alert(url);
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
			//alert(url);
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
			window.location.assign("/factoroptions.html?modelid="+$scope.choiceModel+"&factorid="+$scope.choiceFactor)
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
}