/**
 * Created by quang on 7/14/2015.
 */
var myTreeData;
//load form list factorlist
function factorlistangular($scope,$http,url)
{
    $scope.createWidget = false;
    //alert(url);
    $http.get(url)
        .success(function (data) {
            alert(data);
            $scope.employees = [
                {
                    "EmployeeID": 2, "FirstName": "Andrew", "LastName": "Fuller", "Country": "USA", "Title": "Vice President, Sales", "HireDate": "1992-08-14 00:00:00", "BirthDate": "1952-02-19 00:00:00", "City": "Tacoma", "Address": "908 W. Capital Way", "expanded": "true",
                    children: [
                        { "EmployeeID": 8, "FirstName": "Laura", "LastName": "Callahan", "Country": "USA", "Title": "Inside Sales Coordinator", "HireDate": "1994-03-05 00:00:00", "BirthDate": "1958-01-09 00:00:00", "City": "Seattle", "Address": "4726 - 11th Ave. N.E." },
                        { "EmployeeID": 1, "FirstName": "Nancy", "LastName": "Davolio", "Country": "USA", "Title": "Sales Representative", "HireDate": "1992-05-01 00:00:00", "BirthDate": "1948-12-08 00:00:00", "City": "Seattle", "Address": "507 - 20th Ave. E.Apt. 2A" },
                        { "EmployeeID": 3, "FirstName": "Janet", "LastName": "Leverling", "Country": "USA", "Title": "Sales Representative", "HireDate": "1992-04-01 00:00:00", "BirthDate": "1963-08-30 00:00:00", "City": "Kirkland", "Address": "722 Moss Bay Blvd." },
                        { "EmployeeID": 4, "FirstName": "Margaret", "LastName": "Peacock", "Country": "USA", "Title": "Sales Representative", "HireDate": "1993-05-03 00:00:00", "BirthDate": "1937-09-19 00:00:00", "City": "Redmond", "Address": "4110 Old Redmond Rd." },
                        {
                            "EmployeeID": 5, "FirstName": "Steven", "LastName": "Buchanan", "Country": "UK", "Title": "Sales Manager", "HireDate": "1993-10-17 00:00:00", "BirthDate": "1955-03-04 00:00:00", "City": "London", "Address": "14 Garrett Hill", "expanded": "true",
                            children: [
                                { "EmployeeID": 6, "FirstName": "Michael", "LastName": "Suyama", "Country": "UK", "Title": "Sales Representative", "HireDate": "1993-10-17 00:00:00", "BirthDate": "1963-07-02 00:00:00", "City": "London", "Address": "Coventry House Miner Rd." },
                                { "EmployeeID": 7, "FirstName": "Robert", "LastName": "King", "Country": "UK", "Title": "Sales Representative", "HireDate": "1994-01-02 00:00:00", "BirthDate": "1960-05-29 00:00:00", "City": "London", "Address": "Edgeham Hollow Winchester Way" },
                                { "EmployeeID": 9, "FirstName": "Anne", "LastName": "Dodsworth", "Country": "UK", "Title": "Sales Representative", "HireDate": "1994-11-15 00:00:00", "BirthDate": "1966-01-27 00:00:00", "City": "London", "Address": "7 Houndstooth Rd." }
                            ]
                        }
                    ]
                }];

            // create Tree Grid
            $scope.treeGridSettings =
            {
                width: 850,
                source: new $.jqx.dataAdapter({
                    dataType: "json",
                    dataFields: [
                        { name: 'EmployeeID', type: 'number' },
                        { name: 'FirstName', type: 'string' },
                        { name: 'LastName', type: 'string' },
                        { name: 'Country', type: 'string' },
                        { name: 'City', type: 'string' },
                        { name: 'Address', type: 'string' },
                        { name: 'Title', type: 'string' },
                        { name: 'HireDate', type: 'date' },
                        { name: 'children', type: 'array' },
                        { name: 'expanded', type: 'bool' },
                        { name: 'BirthDate', type: 'date' }
                    ],
                    hierarchy:
                    {
                        root: 'children'
                    },
                    id: 'EmployeeID',
                    localData: $scope.employees
                }),
                sortable: true,
                columns: [
                    { text: 'FirstName', dataField: 'FirstName', width: 200 },
                    { text: 'LastName', dataField: 'LastName', width: 120 },
                    { text: 'Title', dataField: 'Title', width: 160 },
                    { text: 'Birth Date', dataField: 'BirthDate', cellsFormat: 'd', width: 120 },
                    { text: 'Hire Date', dataField: 'HireDate', cellsFormat: 'd', width: 120 },
                    { text: 'Address', dataField: 'Address', width: 250 },
                    { text: 'City', dataField: 'City', width: 120 },
                    { text: 'Country', dataField: 'Country' }
                ]
            };
            $scope.createWidget = true;
            //alert('aa');
    });
    //alert('aa');

}

function loaddropdowntree(factortreedropdown)
{
    $("#dropDownButton").jqxDropDownButton({ width: 200, height: 25 });

    $('#jqxTree').on('select', function (event) {
        var args = event.args;
        var item = $('#jqxTree').jqxTree('getItem', args.element);
        alert(item.value);
        var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
        $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
    });



    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'parentid' },
            { name: 'text' },
            { name: 'value' }
        ],
        id: 'id',
        localdata: factortreedropdown
    };

    // create data adapter.
    var dataAdapter = new $.jqx.dataAdapter(source);
    // perform Data Binding.
    dataAdapter.dataBind();
    // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents
    // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter
    // specifies the mapping between the 'text' and 'label' fields.
    var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);
    $('#jqxTree').jqxTree({ source: records, width: '300px' });
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