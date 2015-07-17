/**
 * Created by quang on 7/18/2015.
 */
//khai bao bien dinh nghia valid message
function returnmessage(code)
{
    var err='';
    switch (code) {
        case '0':
            err = "SUSSCESS";
            break;
        case '1':
            err = "Weight and Rate have problems";
            break;
        case '2':
            err = "Weight have problems";
            break;
        case '3':
            err = "Rate have problems";
            break;
    }
    return err;
}

function checkweightrate($scope,$http,modelid)
{
    $http.get(url_checkweightrate_scala+"/"+modelid)
    .success(function (data) {
            if(data.checkweightrate.header.code==0)
            {
                return true;
            }
            else
            {
                alert(returnmessage(data.checkweightrate.header.code));
                return false;
            }
    })
}
