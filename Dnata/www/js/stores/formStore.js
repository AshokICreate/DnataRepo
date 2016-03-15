define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/formConstants");
    var serverCall = require ("util/serverCall");

    var formData;
    var keysToShow ={
      "MS_INC_POTENTIAL_INJ_FORM":[
                                  "INCIDENT_DESCRIPTION_LKP",
                                  "INC_DATE_AND_TIME",
                                  "INC_DATE_AND_TIME",
                                  "INCIDENT_TIME_HOUR",
                                  "INCIDENT_TIME_MINUTES",
                                  "INC_WHILE",
                                  "INC_WAS",
                                  "INC_BECAUSE",
                                  "INC_LOCATION_LKP",
                                  "INC_SUB_LOCATION_LKP",
                                  "INC_SUB_LOCATION_LOCALIZED_LKP",
                                  "INC_EXACT_LOCATION",
                                  "INC_SHARED_ONLY_HEAD_SAFETY",
                                  "INC_ATTACHMENT",
                                  "INC_COMMENTS"]
    }

    var FormStore = assign ({}, EventEmitter.prototype, {
      getData:function(){
          return formData;
      },
      getResorceData:function(url,callback)
      {
          serverCall.connectServer("GET",url,"",callback)
      },
      submitFormData:function(id,callback)
      {
          var obj = formData[id];
          var data = JSON.stringify(obj.data);
          serverCall.connectServer("PUT","tasks/"+obj.assignmentId+"/form",data,callback);
      },
      getKeysToShow:function(id)
      {
        return keysToShow[id];
      },
      emitChange: function(eventId) {
        this.emit(eventId);
      },
      addChangeListener: function(eventId,callback) {
        this.on(eventId, callback);
      },
      removeChangeListener: function(eventId,callback) {
        this.removeListener(eventId, callback);
      }
    });

    appDispatcher.register (function (action) {
      switch (action.actionType) {
        case constants.Get_Form_Data:
        {
          getFormData(action.formId);
          break;
        }
        case constants.Clear_Form_Data:
        {
          delete formData[action.formId];
          break;
        }
        default:
        {
            console.log ("No Registered action");
            return true;
        }
      }

      FormStore.emitChange(constants.NO_Change);
    });

    return FormStore;

    function getFormData(id)
    {
        var assignmentId = "";
        var gotFormData = function(data)
        {
          var obj = {
                      assignmentId:assignmentId,
                      data:data
                    }
          if(!formData)
          {
            formData = {};
          }
          formData[id] = obj;
          FormStore.emitChange(constants.Change_Data_Event);
        }
        var gotTasks = function(data)
        {
            if(data.items)
            {
              for(var i=0;i<data.items.length;i++)
              {
                  var obj = data.items[i];
                  if(obj.metricName === id)
                  {
                    serverCall.connectServer("GET","tasks/"+obj.assignmentId+"/form","",gotFormData);
                    assignmentId = obj.assignmentId;
                    return;
                  }
              }

            }
        }
        serverCall.connectServer("GET","tasks","",gotTasks)
    }

  });
