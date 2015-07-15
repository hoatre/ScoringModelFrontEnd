/**
 * Created by quang on 7/14/2015.
 */
var myTreeData;
//load form list factorlist
function factorlistangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            //alert(data);
            //$scope.factorlist = data;
            var factortreelist=[];
            for(var i=0;i<data.length;i++)
            {
                var factortree = {
                    "factorid": data[i]._id,
                    "parentid": data[i].factor.parentid,
                    "name": data[i].factor.name,
                    "description":data[i].factor.description,
                    "weigth":data[i].factor.weigth,
                    "status":data[i].factor.status
                };
                factortreelist.push(factortree);
            }
            //alert(factortreelist.length);

            // prepare the data
            var source =
            {
                dataType: "json",
                dataFields: [
                    { name: 'factorid', type: 'string' },
                    { name: 'parentid', type: 'string' },
                    { name: 'name', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'weigth', type: 'string' },
                    { name: 'status', type: 'string' }
                ],
                hierarchy:
                {
                    keyDataField: { name: 'factorid' },
                    parentDataField: { name: 'parentid' }
                },
                id: 'factorid',
                localData: factortreelist
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $("#treeGrid").jqxTreeGrid(
                {
                    width: "100%",
                    source: dataAdapter,
                    sortable: true,
                    ready: function()
                    {
                        $("#treeGrid").jqxTreeGrid('expandRow', '2');
                    },
                    columns: [
                        { text: 'name', columnGroup: 'name', dataField: 'name', width: 300},
                        { text: 'description', dataField: 'description'},
                        { text: 'weigth', columnGroup: 'weigth', dataField: 'weigth'},
                        {
                            text: 'Action', cellsAlign: 'center', align: "center", columnType: 'none', editable: false, sortable: false, dataField: null, cellsRenderer: function (row, column, value) {
                            // render custom column.
                                //alert(row);
                                return "<a href='/factordetail.html?id="+row+"'><img src='assets/images/edit.png' height='30px'/></a>";
                                    //+"<a onclick=\"factordeletree('"+row+"')\" class='btn btn-danger'><i class='fa fa-times icon-only'></i></a>";
                            }
                        }
                    ],
                    columnGroups: [
                        { text: 'Name', name: 'Name' }
                    ]
            });
    })
}

function factordeletree(id)
{
    alert(id);
}

//load form list modellist
function modellistangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            //alert(data);
            $scope.modelinfos = data;


        })
}

function getfactordetailangular($scope,$http,url)
{
    //alert(url);
    $http.get(url)
        .success(function (data) {
            alert(data);
            $scope.factordetail = data;
        })
}

function factordelete($scope,$http,url)
{
    $scope.factordelete = function(index){
        alert(index);
        $http.post(url, {id:index}).
            success(function(data, status, headers, config) {
                alert(data);
                window.location.assign("/factors.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
}

function actionfactordetailangular($scope,$http,url)
{
    //alert($scope.groups._id);
    $scope.save = function(){
        if(!$scope.formFactor.$valid) {
            return;
        }
        $http.post(url, {factors:$scope.factordetail}).
            success(function(data, status, headers, config) {
                window.location.assign("/factors.html")
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
}

function factortree($scope,$http,url)
{
    //alert($scope.factors);
    /*var data=[];
    factor.parentid=null;
    factor.name='root';
    factor.description='root';
    factor.weight='100%';
    factors.id="559b90baa776ee00166a597f";
    factors.factor=factor;
    data.push(factors);*/
    //alert(factorlist);
    /*data=$scope.factorlist;

    var tree;
    var rawTreeData=[];
    for(var i=0;i<data.length;i++)
    {
        var datatree={
            "DemographicId": data[i]._id,
            "ParentId": data[i].factor.parentid,
            "Name": data[i].factor.name,
            "Description": data[i].factor.description,
            "Weight": data[i].factor.weight
            //"Population": 918212000,
            //"TimeZone": "UTC -5 to -10"
        }
        //alert(datatree.Name);
        rawTreeData.push(datatree);
    }


    myTreeData = getTree(rawTreeData, 'DemographicId', 'ParentId');

    $scope.tree_data = myTreeData;
    $scope.my_tree = tree = {};
    $scope.expanding_property = {
        field: "Name",
        displayName: "Demographic Name",
        sortable : true,
        filterable: true
    };
    $scope.col_defs = [
        {
            field: "Description",
            sortable : true,
            sortingType : "string"
        },
        {
            field: "Weight",
            sortable : true,
            sortingType : "string",
            filterable: true
        }
    ];
    $scope.my_tree_handler = function (branch) {
        console.log('you clicked on', branch)
    }*/

}

/*function getTree(data, primaryIdName, parentIdName) {
    if (!data || data.length == 0 || !primaryIdName || !parentIdName)
        return [];

    var tree = [],
        rootIds = [],
        item = data[0],
        primaryKey = item[primaryIdName],
        treeObjs = {},
        parentId,
        parent,
        len = data.length,
        i = 0;

    while (i < len) {
        item = data[i++];
        primaryKey = item[primaryIdName];
        treeObjs[primaryKey] = item;
        parentId = item[parentIdName];

        if (parentId) {
            parent = treeObjs[parentId];

            if (parent.children) {
                parent.children.push(item);
            } else {
                parent.children = [item];
            }
        } else {
            rootIds.push(primaryKey);
        }
    }

    for (var i = 0; i < rootIds.length; i++) {
        tree.push(treeObjs[rootIds[i]]);
    };

    return tree;
}*/


$(document).ready(function () {
    //alert('aaa');

});