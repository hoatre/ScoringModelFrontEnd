
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
		validatemodel($scope,$http);
	}).controller('factorAction', function ($scope, $http) {
		//modulecheckroleaction($scope,$http,'/factors');
	}).controller('factorDetailController', function ($scope, $http,$location) {
		//alert(url_factordetailangular);
		$scope.choiceModel = '';
		$scope.factordetail = factors;
		var modelid = '';
		var id = '';
		modelid = geturlvaluehtml($location.absUrl(),"modelid");
		id = geturlvaluehtml($location.absUrl(),"id");
		//alert(modelid);
		$scope.factordetail.ModelId=modelid;
		//alert($scope.factordetail.ModelId);
		modellistbymodelsatusangular($scope,$http,url_modellisbymodelstatustangular_scala);
		//factorlistangular($scope,$http,url_factorlistangular_scala);

		//modeldetailChanged($scope,$http,modelid);
		factorlistbymodelidangular($scope,$http,modelid)
		if(id!='')
		{
			getfactordetailangular($scope,$http,url_factordetailbyfactoridtangular_scala,id);
		}


		//factorlistbymodelidangular($scope,$http);
		actionfactordetailangular($scope,$http,url_factorupdateangular_scala);
	})