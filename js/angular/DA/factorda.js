//load form list factorlist
function factorlistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
		.success(function (data) {
			//alert(data);
			//$scope.factorlist = data;
			var factortreelist=[];
			for(var i=0;i<data.length;i++)
			{
				var factortree = {
					"factorid": data[i]._id,
					"parentid": data[i].factor.parentid,
					"name": data[i].factor.name,
					"description":data[i].factor.description,
					"weigth":data[i].factor.weigth,
					"status":data[i].factor.status
				};
				factortreelist.push(factortree);
			}
			//alert(factortreelist.length);

			// prepare the data
			var source =
			{
				dataType: "json",
				dataFields: [
					{ name: 'factorid', type: 'string' },
					{ name: 'parentid', type: 'string' },
					{ name: 'name', type: 'string' },
					{ name: 'description', type: 'string' },
					{ name: 'weigth', type: 'string' },
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
						{ text: 'name', columnGroup: 'name', dataField: 'name', width: 300},
						{ text: 'description', dataField: 'description'},
						{ text: 'weigth', columnGroup: 'weigth', dataField: 'weigth'},
						{
							text: 'Action', cellsAlign: 'center', align: "center", columnType: 'none', editable: false, sortable: false, dataField: null, cellsRenderer: function (row, column, value) {
							// render custom column.
							//alert(row);
							return "<a href='/factordetail.html?id="+row+"'><img src='assets/images/edit.png' height='30px'/></a>";
							//+"<a onclick=\"factordeletree('"+row+"')\" class='btn btn-danger'><i class='fa fa-times icon-only'></i></a>";
						}
						}
					],
					columnGroups: [
						{ text: 'Name', name: 'Name' }
					]
				});
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