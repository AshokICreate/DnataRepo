define(function(require){

  var constructInsertColoumnsAndValues = function (tableName, arrayOfDictionary) {

        //INSERT INTO vehicles (id, vehicle_ref_no, vehicle_plate_no) VALUES (NULL, ?, ?);

        var insertQuery = "INSERT OR IGNORE INTO ";
        insertQuery += tableName + " ";
        //insertQuery += "( ";

        var colNameString = " ( ";
        var colValueString = " ( ";

        var keys = Object.keys(arrayOfDictionary);
        colNameString += keys.join(", ");
        colNameString += " )";

        for (var key in arrayOfDictionary) {
            colValueString += " '" + arrayOfDictionary[key] + "', ";
        }
        var colValue = colValueString.substring(0, colValueString.length - 2);

        colValue += " )";
        insertQuery += colNameString;
        insertQuery += " VALUES ";
        insertQuery += colValue;
        return insertQuery;
    };

    var constructWhereParameters = function (parameters) {
        var parameterArrayLength = Object.keys(parameters).length;
        var whereClause = " ";
        if (parameterArrayLength === 0) {
            return whereClause
        }
        else {
            whereClause = "WHERE ";
        }

        for (var i = 0; i < parameterArrayLength; i++) {
            var eachDict = parameters[i];
            var count = 0;
            for (var key in eachDict) {
                var cName = key;
                var cValue = eachDict[key];
                whereClause += cName + " = " + "'" + cValue + "'";
                //console.log(eachDict.length);
                count++;
                if (count !== Object.keys(eachDict).length) {
                    whereClause += " AND ";
                }
            }
        }
        return whereClause;
    };

  var db;
  var dbActions = {
    prepareDB: function(){
      db = window.sqlitePlugin.openDatabase({name: "datastore.db", key: "welcome*123", location: 0}, function(db) {
              db.transaction(function(tx) {
                  // create contents table and resource table

                  var createContentTable = 'CREATE TABLE IF NOT EXISTS content (' +
                    'id TEXT,' +
                    'value TEXT,' +
                    'datatype TEXT,' +
                    'tid TEXT,' +
                    'metricname TEXT,' +
                    'parentid TEXT,'+
                    'arrayindex TEXT'+
                    ')';
                    tx.executeSql(createContentTable,[],function(sucesscb){
                      console.log('Content Table has been created sucessfully if created already it has been ignored');
                    },function(errorcb){
                      console.log('Creation of Content Table has failed: '+ errorcb.message)
                    });
              }, function(err) {
                    console.log('Open database ERROR: ' + JSON.stringify(err));
              });
          });
    },
    insertData: function (tableName, coloumnNameAndValues) {
         /*var iQuery = "INSERT INTO contents  (id, fid, pid, value, datatype, arrayindex, arraycount) VALUES  ( 'DNS_START_DATE', 'T-no-12345xxxx', 'content', 'string','0','1')";*/
         if (db) {
             db.transaction(function (tx) {
                 for (var ind = 0; ind < coloumnNameAndValues.length; ind++) {
                     var eachColAndValue = coloumnNameAndValues[ind];
                     var insQuery = constructInsertColoumnsAndValues(tableName, eachColAndValue);
                     tx.executeSql(insQuery, [], function (tx, results) {
                         console.log("Inserting rows into DB is sucessfull")
                         console.log(results);
                     }, function (tx, error) {
                         console.log('ERROR While Inserting Data From DB: ' + JSON.stringify(error));
                     });
                 }
             });
         }
     },
     updateTable: function(tablename, params, whereparams){
       if(db){
         db.transaction(function (t) {
             for(var i=0;i<params.length;i++){
               var eachDict = params[i];
               var updateQuery = 'UPDATE ' + tablename + ' SET ';
               var count = 0;
                for(var key in eachDict){
                  var cName = key;
                  var cValue = eachDict[key];
                  updateQuery += cName + " = " + "'" + cValue + "'";
                  count++;
                  if (count !== Object.keys(eachDict).length) {
                      updateQuery += " , ";
                  }

                }

                updateQuery += constructWhereParameters(whereparams);

                t.executeSql(updateQuery, [], function (tx,sucess) {
                     console.log('Rows Updated Succesfully');
                 }, function (tx,error) {
                   console.log('ERROR While Updating Data to  DB: ' + JSON.stringify(error));
                 });
             }
         });
      }
     },
     getDataFromTable: function (tableName, whereParameters, resultCallBack) {
            if (db) {
                db.transaction(function (t) {
                    var readQuery = 'SELECT * FROM ';
                    readQuery += tableName + " ";
                    if (whereParameters.length > 0) {
                        readQuery += constructWhereParameters(whereParameters)
                    }
                    t.executeSql(readQuery, [], function (t, results) {
                        console.log('Getting Data From DB Sucess');
                        resultCallBack(results.rows);
                    }, function (t, error) {
                      console.log('ERROR While Reading Data From DB: ' + JSON.stringify(err));
                    });
                });
            }
        }

  };
  return dbActions;

});
