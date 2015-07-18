

//load form list grouplist
function grouplistangular($scope,$http,url)
{
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.groups = data;
	})
}
//load form list grouplist
function userlistangular($scope,$http,url)
{
	//alert(url);
	$http.get(url)
	.success(function (data) {
		//alert(data);
		$scope.users = data;
	})
}

function groupChanged($scope,$http,url)
{
	$scope.groupChanged = function(index){
		//alert("groupChanged: "+index);
		$http.post(url_usergroupchange, {groupid:index}).
		  success(function(data, status, headers, config) {
			//alert(data);
			//$scope.userschoice = data;
			loaduser(data);
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  });
   }
}


function actionusergroupdetailangular($scope,$http,url)
{
	$scope.save = function(){
		//alert(getvalue_func());
		$scope.usergroup.userid = getvalue_func();
		$http.post(url, {usergroup:$scope.usergroup}).
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
		checktable(data[i]._id);
	}
}
function checktable(userid)
{
	//alert(userid);
	$('#tablemodule').find('tr > td:first-child input:checkbox').each(function() {
		if(this.value==userid)
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