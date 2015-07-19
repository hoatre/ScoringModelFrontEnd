//khai bao dia chi server
var address_server = "http://localhost:8080";
var address_server_scala = "http://10.15.171.35:8080";

//khai bao duong dan
//dung chung
var url_userlogin =address_server + "/userlogin";
var url_checkroleaction =address_server + "/checkroleaction";
var url_rolemodulesangular = address_server+"/rolemodulesangular";

//user
var url_userangular = address_server+"/userangular";
//module
var url_modulelistangular = address_server+"/modulelistangular";
var url_moduledelete = address_server+"/moduledelete";
var url_moduledetailangular = address_server+"/moduledetailangular";

//group
var url_grouplistangular = address_server+"/grouplistangular";
var url_groupdelete = address_server+"/groupdelete";
var url_groupdetailangular = address_server+"/groupdetailangular";

//role
var url_rolelistangular = address_server+"/rolelistangular";
var url_roledelete = address_server+"/roledelete";
var url_roledetailangular = address_server+"/roledetailangular";

//groupmodule
var url_groupchange = address_server+"/groupchange";
var url_groupmoduledetailangular = address_server+"/groupmoduleangular";

//groupmodulerole
var url_groupmodulerolechange = address_server+"/groupmodulerolechange";
var url_groupmoduleroledetailangular = address_server+"/groupmoduleroleangular";

//usergroup
var url_usergroupchange = address_server+"/usergroupchange";
var url_usergroupdetailangular = address_server+"/usergroupdetailangular";

//factoroption
var url_factorchange = address_server+"/factorchange";
var url_factoroptiondelete = address_server+"/factoroptiondelete";
var url_factoroptionlistangular = address_server+"/factoroptionlistangular";
var url_factoroptiondetailangular = address_server+"/factoroptiondetailangular";

//factor
var url_factordelete = address_server+"/factordelete";
var url_factorlistangular = address_server+"/factorlistangular";
var url_factordetailangular = address_server+"/factordetailangular";

//model
var url_modellistangular = address_server+"/modellistangular";
var url_modeldelete = address_server+"/modeldelete";
var url_modeldetailangular = address_server+"/modeldetailangular";

//rating
var url_ratinglistangular = address_server+"/ratinglistangular";
var url_ratinglistbymodelidangular = address_server+"/ratinglistbymodelidangular";
var url_ratingdelete = address_server+"/ratingdelete";
var url_ratingdetailangular = address_server+"/ratingdetailangular";

//services scala
var url_grouplistangular_scala = address_server_scala+"/group/getall";
var url_groupdetailangular_scala = address_server_scala+"/group/getbygroupid";
var url_groupdelete_scala = address_server_scala+"/group/delete";
var url_groupupdate_scala = address_server_scala+"/group/update";

//model
var url_modellistangular_scala = address_server_scala+"/modelinfo/getall";
var url_modellisbymodelstatustangular_scala = address_server_scala+"/modelinfo/getbymodelinfostatus";
var url_modeldetailangular_scala = address_server_scala+"/modelinfo/getbymodelinfoid";
var url_modelrangerandupdateangular_scala = address_server_scala+"/modelinfo/rangeandupdate";
var url_modelinsertangular_scala = address_server_scala+"/modelinfo/insert";
var url_modelupdateangular_scala = address_server_scala+"/modelinfo/update";
var url_modeldeleteangular_scala = address_server_scala+"/modelinfo/delete";


//rating
var url_ratinglistangular_scala = address_server_scala+"/rating/getall";
var url_ratinglistbymodelidangular_scala = address_server_scala+"/rating/getmodelid";
var url_ratingdelete_scala = address_server_scala+"/rating/delete";
var url_ratingdetailangular_scala = address_server_scala+"/rating/getcode";
var url_ratinginsertangular_scala = address_server_scala+"/rating/insert";
var url_ratingupdatetangular_scala = address_server_scala+"/rating/update";

//factor
var url_factorlisbymodelidtangular_scala = address_server_scala+"/modelinfo/view";
var url_factordetailbyfactoridtangular_scala = address_server_scala+"/factor/getbyfactorid";
var url_factorlistangular_scala = address_server_scala+"/factor/getall";
var url_factorupdateangular_scala = address_server_scala+"/factor/update";
var url_factorinsertangular_scala = address_server_scala+"/factor/insert";
var url_factordeletetangular_scala = address_server_scala+"/factor/delete";

//factoroption
var url_factoroptiondelete_scala = address_server_scala+"/factor/deleteOption";
var url_factoroptioninsert_scala = address_server_scala+"/factor/insertOption";
var url_factoroptionupdate_scala = address_server_scala+"/factor/updateOption";
var url_factoroptiondetail_scala = address_server_scala+"/factoroption/getbyfactoroptionid";
var url_factoroptionbymodelid_scala = address_server_scala+"/factoroption/getbymodelid";

//model Test
var url_modelGetAll = address_server_scala+"/modelinfo/getall";
var url_modelGetByStatus = address_server_scala+"/modelinfo/getbymodelinfostatus";
var url_modelGetAllFactor = address_server_scala+"/modelinfo/view";
var url_modelGetScore = address_server_scala+"/scoreresult";

//valid
var url_checkweightrate_scala = address_server_scala+"/validate/checkweightrate";