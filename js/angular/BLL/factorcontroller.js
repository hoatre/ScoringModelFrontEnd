
	app.controller('factorController', function ($scope, $http,$location) {
		$scope.choiceModel = '';
		var modelid=geturlvaluehtml($location.absUrl(),"modelid");
		$scope.choiceModel = modelid;
		modellistangular($scope,$http,url_modellistangular_scala);
		modelChanged($scope,$http);
		factoradd($scope,$http);
		//factorlistangular($scope,$http,url_factorlistangular);
		factordelete($scope,$http,url_factordelete);
		gennerateScoringRange($scope,$http);
	}).controller('factorAction', function ($scope, $http) {
		//modulecheckroleaction($scope,$http,'/factors');
	}).controller('factorDetailController', function ($scope, $http,$location) {
		//alert(url_factordetailangular);
		$scope.choiceModel = '';
		$scope.factordetail = factors;
		modellistbymodelsatusangular($scope,$http,url_modellisbymodelstatustangular_scala);
		//factorlistangular($scope,$http,url_factorlistangular_scala);
		var modelid = '';
		modelid = geturlvaluehtml($location.absUrl(),"modelid");
		$scope.factordetail.ModelId=modelid;
		getfactordetailangular($scope,$http,url_factordetailbyfactoridtangular_scala,geturlidhtml($location.absUrl()));

		if(modelid!='')
		{
			modeldetailChanged($scope,$http,modelid);
		}
		else
		{
			modeldetailChanged($scope,$http)
		}
		//factorlistbymodelidangular($scope,$http);
		actionfactordetailangular($scope,$http,url_factorupdateangular_scala);
	})