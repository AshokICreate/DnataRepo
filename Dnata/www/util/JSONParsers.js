define(function(require){
  var db = require("./DBManager");

  var arrayOfObjects = [];
  var taskid = "";
  var metricname = "";
  var recursiveQueryBuilder = function(jsonObj, parentId, arrayindex){
    // parentId = "content", id = DD_OBJECT_TYPE, value = null datatype = Object
    // parentId = "DD_OBJECT_TYPE", id = value, value = "MS_INC_ACTUAL_INJURY" datatype = String

    //$.each(jsonObj, function(key, value) {
      var type = typeDefHelper(jsonObj);
      switch (type) {
        case "ARRAY":
        for (var ind = 0; ind < jsonObj.length; ind++) {
          recursiveQueryBuilder(jsonObj[ind], parentId, ind);
        }
        //console.log("parentId = "+parentId+", id = "+key+", value = undefined datatype = ARRAY");
        break;
        case "OBJECT":
          $.each(jsonObj, function(key1, value1) {
            if(typeDefHelper(value1) != "ARRAY" &&  typeDefHelper(value1) != "OBJECT"){
              arrayOfObjects.push({
                "parentId":parentId,
                "id":key1,
                "value":value1,
                "datatype":typeDefHelper(value1),
                "arrayIndex":arrayindex,
                "tid":taskid,
                "metricname":metricname
              });

              //console.log("parentId:"+parentId+", id:"+key1+", value:"+value1+" datatype: "+ typeDefHelper(value1) +" ArrayIndex:"+ arrayindex);
            } else {
            //  console.log("parentId:"+parentId+", id:"+key1+", value:undefined, datatype:"+ typeDefHelper(value1)+" ArrayIndex:"+ arrayindex);
              arrayOfObjects.push({
                "parentId":parentId,
                "id":key1,
                "value":undefined,
                "datatype":typeDefHelper(value1),
                "arrayIndex":arrayindex,
                "tid":taskid,
                "metricname":metricname
              });
              recursiveQueryBuilder(value1,key1, arrayindex);
            }
          });
          break;
        default:
          console.log("Default");
      }
    //});
  };

  var typeDefHelper = function(value) {
    var type = undefined;
    if(Array.isArray(value)){
      type = "ARRAY";
    } else if (typeof value === 'string') {
      type = "STRING";
    } else if (Number.isInteger(value)) {
      type = "NUMBER";
    } else {
      type = "OBJECT";
    }
    return type;
  };

  var arrayFilter = function(arrayObj, parentId) {
    var filteredArray = []
    for (var i = 0; i < arrayObj.length ; i++) {
    if (arrayObj[i].parentId == parentId) {
        filteredArray.push(arrayObj[i]);
      }
    }
    return filteredArray;
  };

  var jsonObj = {
    "content":{}
  };

  var isInt = function(value) {
    if (isNaN(value)) {
     return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
  };

  var modifyJson = function(path, val) {
    var e = jsonObj, l = path.pop();
    path.forEach(function(x) { x in e ? e = e[x] : e; });
    //To handle array index , if index not present we hve to create one
    var arrayIndex = path[path.length-1];
    if(isInt(arrayIndex)){
      if(e.length < parseInt(arrayIndex) + 1){
        e[parseInt(arrayIndex)] = {};
        e = e[parseInt(arrayIndex)];
      }
    }
    e[l] = val;
    return jsonObj;
  };

  var constructJson = function(arrayObj, parentId, pathArray){
    var filteredArray =  arrayFilter(arrayObj, parentId);
    if(filteredArray.length != 0){
      filteredArray.forEach(function(obj) {
        console.log(obj);
        switch (obj.datatype) {
          case "STRING":
            var newPathArray = pathArray.slice();
            newPathArray.push(obj.parentId);
            newPathArray.push(obj.id);
            modifyJson(newPathArray,obj.value);
            break;
          case "OBJECT":
            var newPathArray = pathArray.slice();
            newPathArray.push(obj.parentId);
            if(obj.arrayIndex != "undefined"){
              newPathArray.push(obj.arrayIndex);
            }
            newPathArray.push(obj.id);
            modifyJson(newPathArray,{});
            constructJson(arrayObj, obj.id, newPathArray);
           break;
          case "ARRAY":
            var newPathArray = pathArray.slice();
            newPathArray.push(obj.parentId);
            if(obj.arrayIndex != "undefined"){
              newPathArray.push(obj.arrayIndex);
            }
            newPathArray.push(obj.id);
            modifyJson(newPathArray,[]);
            constructJson(arrayObj, obj.id, newPathArray);
           break;
          default:
            console.log("Default");
        }
    });
    }
  };


  var getDatatoInsert = function(params){
    if(params.datatype === "STRING"){
      var datatoInsert = [];
      var firstObject = {};
      var secondObject = {};

      firstObject["id"] = params.id;
      firstObject["value"] = "undefined";
      firstObject["datatype"] = "OBJECT";
      firstObject["tid"] = params.tid;
      firstObject["metricname"] = params.metricname;
      firstObject["parentid"] = params.parentid;
      firstObject["arrayindex"] = params.arrayindex;
      datatoInsert.push(firstObject);

      secondObject["id"] = "value";
      secondObject["value"] = params.value;
      secondObject["datatype"] = params.datatype;
      secondObject["tid"] = params.tid;
      secondObject["metricname"] = params.metricname;
      secondObject["parentid"] = firstObject.id;
      secondObject["arrayindex"] = params.arrayindex;
      datatoInsert.push(secondObject);
      return datatoInsert;
    }else if(params.datatype === "ARRAY"){
      var datatoInsert = [];
      var firstObject = {};
      firstObject["id"] = params.id;
      firstObject["value"] = params.value;
      firstObject["datatype"] = params.datatype;
      firstObject["tid"] = params.tid;
      firstObject["metricname"] = params.metricname;
      firstObject["parentid"] = params.parentid;
      firstObject["arrayindex"] = params.arrayindex;
      datatoInsert.push(firstObject);
      return datatoInsert;
    }
  };

  var jsonParser = {
    parseJsonToFormContent: function(tablename,formJsonObject, tid,mname){
      taskid = tid;
      metricname = mname;
      var jsonContentFile = "";
      if ((formJsonObject != "") || (formJsonObject != "undefined")){
        jsonContentFile = JSON.parse(formJsonObject);
      }
      recursiveQueryBuilder(jsonContentFile.content,"content", undefined);
      //console.log(arrayOfObjects);
      db.insertData(tablename,arrayOfObjects);
    },
    parseContentToJson: function(tablename, tid, mname,sucessResult){
      var params = [{
          "metricname" : mname,
          "tid" : tid
        }];
      var jsonArray = [];
      db.getDataFromTable (tablename, params, function (response) {
            if (response) {
              for(var res = 0; res < response.length; res++){
                jsonArray.push(response.item(res));
              }
            }
            constructJson(jsonArray,["content"],[])
            sucessResult(jsonObj);
      });
    },

    updateDataintoContent: function(tableName, params, whereparams){

      //array of objects should be the params
      /* var params = [{
         "id":"DD_CURRENT_USER_NAME",
         "value":"ayyanababu",
         "datatype":"STRING",
         "tid":"T-101-1234-4563",
         "metricname":"MS_INC_ACTUAL_INJURY",
         "parentid":"content",
         "arrayindex":"undefined",
       }];*/

      /* var params = [{
         "id":"SB_ACTIVITY_INVOLVED",
         "value":"[1,2,3,4,5,6,7,8]",
         "datatype":"ARRAY",
         "tid":"T-101-1234-4563",
         "metricname":"MS_INC_ACTUAL_INJURY",
         "parentid":"SBR",
         "arrayindex":"0",
       }];

       var whereparams = [{
         "id":"SB_ACTIVITY_INVOLVED",
         "parentid":"SBR",
         "arrayindex":"0"

       }];*/

       for(var i=0;i<params.length;i++){
         var datatoinsert = getDatatoInsert(params[i]);
         db.updateTable(tableName,datatoinsert,whereparams);
        // console.log(datatoinsert);
        // console.log("debug to see the data");
        // db.updateTable("content",datatoinsert,whereparams);
       }
     },
     insertNewRowintoContent: function(tablename,params){
       /* var params = [{
          "id":"DD_CURRENT_USER_NAME",
          "value":"ayyanababu",
          "datatype":"STRING",
          "tid":"T-101-1234-4563",
          "metricname":"MS_INC_ACTUAL_INJURY",
          "parentid":"content",
          "arrayindex":"undefined",
        }];*/
      /* var params =
      [
        {
         "id":"SB_ACTIVITY_INVOLVED",
         "value":"[1,2,3,4,5]",
         "datatype":"ARRAY",
         "tid":"T-101-1234-4563",
         "metricname":"MS_INC_ACTUAL_INJURY",
         "parentid":"SBR",
         "arrayindex":"2",
       },
       {
         "id":"SB_TYPE",
         "value":"SB_TYPE_2",
         "datatype":"STRING",
         "tid":"T-101-1234-4563",
         "metricname":"MS_INC_ACTUAL_INJURY",
         "parentid":"SBR",
         "arrayindex":"2",
       }
     ];*/
       for(var i=0;i<params.length;i++){
         var datatoinsert = getDatatoInsert(params[i]);
         db.insertData(tablename,datatoinsert);
       }
     }

  };
  return jsonParser;
});
