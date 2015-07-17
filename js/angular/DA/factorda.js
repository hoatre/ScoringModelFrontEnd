//load form list factorlist

function modellistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
		.success(function (data) {
			//alert(data);
			$scope.modelinfos = data["ModelInfosList"];
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

function factorlistbymodelidangular($scope,$http)
{
	//alert(url_factorlisbymodelidtangular_scala+"-->"+$scope.factordetail.ModelId);
	$http.post(url_factorlisbymodelidtangular_scala, {id: $scope.factordetail.ModelId}).
		success(function (data, status, headers, config) {
			$scope.factors = data["SUCCESS"];
		}).
		error(function (data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
}

function modeldetailChanged($scope,$http)
{
	//alert(url_factorlisbymodelidtangular_scala+"-->"+$scope.factordetail.ModelId);
	$scope.modeldetailChanged = function(id) {
		//alert(id);
		$http.post(url_factorlisbymodelidtangular_scala, {id: id}).
			success(function (data, status, headers, config) {
				$scope.factors = data["SUCCESS"];
			}).
			error(function (data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}
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
		if($scope.modelinfodetail.status=='draft')
		{
			$('#btnInsert').show();
		}
		else
		{
			$('#btnInsert').hide();
		}
		$http.post(url_factorlisbymodelidtangular_scala, {id:$scope.modelinfodetail._id}).
			success(function(data, status, headers, config) {
				//$scope.modelinfodetail = data["SUCCESS"];
				//alert(data);
				var factortreelist=[];
				if(typeof data["ERROR"]=='undefined')
				{
					for(var i=0;i<data["SUCCESS"].length;i++)
					{
						var factortree = {
							"factorid": data["SUCCESS"][i]._id,
							"parentid": data["SUCCESS"][i].Parentid,
							"name": data["SUCCESS"][i].FactorName,
							"description":data["SUCCESS"][i].Description,
							"weight":data["SUCCESS"][i].Weight,
							"status":data["SUCCESS"][i].Status
						};
						factortreelist.push(factortree);
					}
				}
				//alert(1);
				// prepare the data
				var source =
				{
					dataType: "json",
					dataFields: [
						{ name: 'factorid', type: 'string' },
						{ name: 'parentid', type: 'string' },
						{ name: 'name', type: 'string' },
						{ name: 'description', type: 'string' },
						{ name: 'weight', type: 'string' },
						{ name: 'status', type: 'string' }
					],
					hierarchy:
					{
						keyDataField: { name: 'factorid' },
						parentDataField: { name: 'parentid' }
					},
					id: 'factorid',
					localData: factortreelist
				};
				//alert(2);
				var dataAdapter = new $.jqx.dataAdapter(source);
				// create Tree Grid
				$("#treeGrid").jqxTreeGrid(
					{
						width: "100%",
						source: dataAdapter,
						sortable: true,
						ready: function()
						{
							$("#treeGrid").jqxTreeGrid('expandRow', '2');
						},
						columns: [
							{ text: 'Name', columnGroup: 'name', dataField: 'name', width: 300},
							{ text: 'Description', dataField: 'description'},
							{ text: 'Weight', columnGroup: 'weight', dataField: 'weight'},
							{
								text: 'Action', cellsAlign: 'center', align: "center", columnType: 'none', editable: false, sortable: false, dataField: null, cellsRenderer: function (row, column, value) {
								// render custom column.
								//alert($scope.modelinfodetail.Status);
								if($scope.modelinfodetail.status=='draft')
								{
									return "<a href='/factordetail.html?id="+row+"'><img src='assets/images/edit.png' height='30px'/></a>";
								}
								else
								{
									return "";
								}
								//+"<a ng-click=\"factordeletree('"+row+"')\" class='btn btn-danger'><i class='fa fa-times icon-only'></i></a>";
							}
							}
						],
						/*columnGroups: [
							{ text: 'Name', name: 'Name' }
						]*/
					});
				//alert(3);
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
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


//load form list modellist


function getfactordetailangular($scope,$http,url,id)
{
	//alert(url);
	//alert(id);
	$http.post(url_factordetailbyfactoridtangular_scala, {id:id}).
		success(function(data, status, headers, config) {
			//alert(data["FactorsList"][0].FactorName);
			$scope.factordetail = data["FactorsList"][0];
			//alert($scope.factordetail.name+"-->"+$scope.factordetail.min);
			factorlistbymodelidangular($scope,$http);
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
}

function factordelete($scope,$http,url)
{
	$scope.factordelete = function(index){
		//alert(index);
		$http.post(url, {id:$scope.factors[index]._id}).
		  success(function(data, status, headers, config) {
			//alert(data);
			window.location.assign("/factors.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}

function actionfactordetailangular($scope,$http)
{
	$scope.save = function(){
		if(!$scope.formFactor.$valid) {
			//alert("Form valid!");
			return;
		}
		//alert(url);
		var factors={};
		var url='';
		if(typeof $scope.factordetail._id == 'undefined'||$scope.factordetail._id =='')
		{
			factors={
				ModelId:$scope.factordetail.ModelId,
				Parentid : $scope.factordetail.Parentid,
				ParentName : $scope.factordetail.ParentName,
				Description: $scope.factordetail.Description,
				Name : $scope.factordetail.FactorName,
				Weight: $scope.factordetail.Weight,
				Ordinal:$scope.factordetail.Ordinal,
				Status:$scope.factordetail.Status,
				Note:$scope.factordetail.Note
			};
			url=url_factorinsertangular_scala;
		}
		else
		{
			factors={
				id:$scope.factordetail._id,
				Parentid : $scope.factordetail.Parentid,
				ParentName : $scope.factordetail.ParentName,
				Description: $scope.factordetail.Description,
				Name : $scope.factordetail.FactorName,
				Weight: $scope.factordetail.Weight,
				Ordinal:$scope.factordetail.Ordinal,
				Status:$scope.factordetail.Status,
				Note:$scope.factordetail.Note
			};
			url=url_factorupdateangular_scala;
		}

		//alert(angular.toJson(factors));
		$http.post(url, angular.toJson(factors)).
		  success(function(data, status, headers, config) {
			window.location.assign("/factors.html")
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
}