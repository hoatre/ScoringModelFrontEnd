/**
 * Created by quang on 7/12/2015.
 */

app.controller('ratinglistController', function ($scope, $http,$location) {
    //alert(url_ratinglistangular);
    $scope.choiceModel = '';
    var modelid=geturlvaluehtml($location.absUrl(),"modelid");
    $scope.choiceModel = modelid;
    modellistangular($scope,$http,url_modellistangular_scala);
    ratinglistangular($scope,$http,url_ratinglistangular_scala);
    ratingdelete($scope,$http,url_ratingdelete_scala);
    modelChanged($scope,$http);
    ratingCheckRating($scope,$http);
    gennerateScoringRange($scope,$http);
    ratingAdd($scope,$http);
    validatemodel($scope,$http);
}).controller('ratinglistAction', function ($scope, $http) {
    //modulecheckroleaction($scope,$http,'/ratinglist');
}).controller('ratingDetailController', function ($scope, $http,$location) {
    $scope.ratings = ratings;
    //modellistangular($scope,$http,url_modellistangular);
    getmodeldetailangular($scope,$http,url_modeldetailangular_scala+"/"+geturlvaluehtml($location.absUrl(),"modelid"));
    var id="/"+geturlvaluehtml($location.absUrl(),"id");
    var modelid="/"+geturlvaluehtml($location.absUrl(),"modelid");
    getratingdetailangular($scope,$http,url_ratingdetailangular_scala+modelid+id);
    actionratingdetailangular($scope,$http,modelid);
})