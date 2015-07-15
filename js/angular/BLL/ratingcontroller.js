/**
 * Created by quang on 7/12/2015.
 */

app.controller('ratinglistController', function ($scope, $http) {
    //alert(url_ratinglistangular);
    $scope.choiceModel = '';
    modellistangular($scope,$http,url_modellistangular);
    ratinglistangular($scope,$http,url_ratinglistangular);
    ratingdelete($scope,$http,url_ratingdelete);
    modelChanged($scope,$http);
    ratingCheckRating($scope,$http);
    ratingAdd($scope,$http);
}).controller('ratinglistAction', function ($scope, $http) {
    modulecheckroleaction($scope,$http,'/ratinglist');
}).controller('ratingDetailController', function ($scope, $http,$location) {
    $scope.ratings = ratings;
    //modellistangular($scope,$http,url_modellistangular);
    getmodeldetailangular($scope,$http,url_modeldetailangular+"/"+geturlvaluehtml($location.absUrl(),"modelid"));
    getratingdetailangular($scope,$http,url_ratingdetailangular+"/"+geturlidhtml($location.absUrl()));
    actionratingdetailangular($scope,$http,url_ratingdetailangular);
})