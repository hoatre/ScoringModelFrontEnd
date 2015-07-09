

//load form list grouplist
function grouplistangular($scope,$http,url)
{
	$http.get(url)
	.success(function (data) {
		$scope.groups = data;
	})
}

function modulelistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.modules = data;
	})
}

function groupChanged($scope,$http,url)
{
	$scope.groupChanged = function(index){
		//alert("groupChanged: "+index);
		$http.post(url, {groupid:index}).
		  success(function(data, status, headers, config) {
			loaduser(data);
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}

//fill list module tree
function modulelisttreeangular($scope,$http,url)
{
	$http.get(url)
	.success(function (data) {
		
		var moduletree = [];
		
		data.forEach( function( modules ){
			var moduledetail = {
				id : modules._id,
				parent : modules.module.parent,
				text :  modules.module.modulename
			}
				
			moduletree.push(moduledetail);
		})
		$(function () {
			$('#jstree3').jstree({'plugins':["wholerow","checkbox"],'core' : { "multiple" : true,
				'data' : moduletree
			}});
			
		});
	})
}

function actiongroupmoduledetailangular($scope,$http,url)
{
	$scope.save = function(){
		//alert('abc');
		//alert("groupmodule: "+$scope.groupmodule.moduleid);
		//alert(getvalue_func());
		$scope.groupmodule.moduleid=getvalue_func();
		//alert($scope.groupmodule.moduleid);
		$http.post(url, {groupmodule:$scope.groupmodule}).
		  success(function(data, status, headers, config) {
			//window.location.assign("/grouplist")
			alert(data);
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
   }
}

//script access form
function clearcheckedtable()
{
	$('#tablemodule').find('tr > td:first-child input:checkbox').each(function() {
		this.checked=false;
	});
}
function loaduser(data)
{
	//alert(data);
	clearcheckedtable();
	//alert(data.length);
	for(var i=0;i<data.length;i++)
	{
		checktable(data[i].groupmodule.moduleid);
	}
	paginguserchoice();
}
function checktable(moduleroleid)
{
	//alert(moduleroleid);
	$('#tablemodule').find('tr > td:first-child input:checkbox').each(function() {
		if(this.value==moduleroleid)
		{
			this.checked=true;
		}
	});
}

function getvalue_func() {
	return $('#tablemodule').find('tr > td:first-child input:checked').map(function () {
		//this is the current checkbox
		return this.value;
		}).get().join(',');
}