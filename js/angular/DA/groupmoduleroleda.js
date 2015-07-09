//load groupmodulerole
function loadgroupmodulerole($scope,$http)
{
	//load all module
	$http.get(url_modulelistangular)
	.success(function (data) {
		//alert(data);
		$scope.modules = data;
	})
	
	//load all role
	$http.get(url_rolelistangular)
	.success(function (data) {
		//alert(data);
		$scope.roles = data;
	})
	
	//get all group
	$http.get(url_grouplistangular)
	.success(function (data) {
		//alert(data[0].group.groupname);
		$scope.groups = data;
	})
}

//group change
function groupChanged($scope,$http)
{
	$scope.groupChanged = function(index){
		//alert("groupChanged: "+index);
		$http.post(url_groupmodulerolechange, {groupid:index}).
		  success(function(data, status, headers, config) {
			loaduser(data);
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}

function actiongroupmoduleroledetailangular($scope,$http,url)
{
	//alert('actiongroupmoduleroledetailangular');
	$scope.save = function(){
		$scope.groupmodulerole.moduleroleid = getvalue_func();
		//alert("actiongroupmoduleroledetailangular: "+$scope.groupmodulerole.moduleroleid);
		$http.post(url, {groupmodulerole:$scope.groupmodulerole}).
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
	$('#tablemodule .case').each(function() {
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
		checktable(data[i].groupmodulerole.moduleid+"#"+data[i].groupmodulerole.roleid);
	}
	paginguserchoice();
}
function checktable(moduleroleid)
{
	//alert(moduleroleid);
	$('#tablemodule .case').each(function() {
		if(this.value==moduleroleid)
		{
			this.checked=true;
		}
	});
}
function getvalue_func() {
  return $('#tablemodule input:checked').map(function() {
	//alert(this.value);
	return this.value;
  }).get().join(',');
}

