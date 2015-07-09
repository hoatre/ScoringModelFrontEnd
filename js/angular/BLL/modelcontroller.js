/**
 * Created by quang on 7/9/2015.
 */

app.controller('modellistController', function ($scope, $http) {
    modellistangular($scope,$http,url_modellistangular);
    modeldelete($scope,$http,url_modeldelete);
}).controller('modellistAction', function ($scope, $http) {
    modelcheckroleaction($scope,$http,'/modellist');
}).controller('modelDetailController', function ($scope, $http,$location) {
    $scope.modeldetail = modelinfos;
    //alert("modelDetailController");
    //modellisttreeangular($scope,$http,url_modellistangular);
    /*$(function () {
     $('#jstree3').on("changed.jstree", function (e, data) {
     $scope.models.model.parent=data.selected;
     $scope.models.model.parentname=data.node.text;
     });
     });*/
    //testabc($scope,$http,"http://10.15.171.21:8080/users/getall");
    //modellistangular($scope,$http,url_modellistangular);
    getmodeldetailangular($scope,$http,url_modeldetailangular+"/"+geturlidhtml($location.absUrl()));
    actionmodeldetailangular($scope,$http,url_modeldetailangular);
})