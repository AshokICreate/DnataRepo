define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/formConstants");
    var serverCall = require ("util/serverCall");
    var JsonParser = require ("util/JSONParsers");
    var formData;
    var keysToShow ={
      "MS_INC_POTENTIAL_INJ_FORM":[
                                  "INCIDENT_DESCRIPTION_LKP",
                                  "INC_DATE_AND_TIME",
                                  "INC_WHILE",
                                  "INC_WAS",
                                  "INC_BECAUSE",
                                  "INC_LOCATION_LKP",
                                  "INC_SUB_LOCATION_LKP",
                                  "INC_SUB_LOCATION_LOCALIZED_LKP",
                                  "INC_EXACT_LOCATION",
                                  "INC_SHARED_ONLY_HEAD_SAFETY",
                                  "INC_COMMENTS",
                                  "INC_ATTACHMENT"

                                ],
        "MS_INC_ACTUAL_INJURY":[
                                  "INCIDENT_DATE",
                                  "ADN_WHILE",
                                  "ADN_WAS",
                                  "ADN_BECAUSE",
                                  "INC_LOCATION",
                                  "INC_SUB_LOCATION",
                                  "EXACT_SUB_LOCATION",
                                  "INC_EXACT_LOCATION",
                                  "WITNESSES",
                                  "ADN_SUPPORTING_DOC"
                                ],
        "PSD":[
                "INJURED_PERSON_CAT",
                "INJURED_PERSON_NAME",
                "INJURED_PERSON_STAFF_NO",
                "EMAIL_ADDRESS",
                "INJURED_PERSON_JOB_TITLE",
                "INJURED_PERSON_DEPT",
                "INJURED_PERSON_COMPANY",
                "INJURED_PERSON_MGR",
                "ACTIVITY_DURING_INJURY",
                "BODY_PART",
                "INJURIES_SUSTAINED",
                "MEDICAL_TREATMENT_RECIEVED"
              ],
        "FLY":[
                "FLIGHT_NUMBER_AVAIL",
                "FLIGHT_NUMBER",
                "CARRIER_NAME",
                "AIRCRAFT_TYPE",
                "REGISTRATION_NUMBER",
                "DAMAGE_ATTRIBUTABLE",
                "ARD_DAMAGE_TIME_ACTIVITY",
                "ARD_AIRCRAFT_DAMAGE",
                "ARD_DAMAGE_PART",
                "ARD_DAMAGE_TYPE",
                "ARD_DELAY_SEVERITY"
              ]

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

          // if(data)
          // {
          //   JsonParser.parseJsonToFormContent("content",data,assignmentId,id);
          // }

        }
        var createdTask = function(data)
        {
            serverCall.connectServer("GET","tasks/"+data.assignmentId+"/form","",gotFormData);
            assignmentId = data.assignmentId;
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
              serverCall.connectServer("GET","tasks/formname="+Id,"",createdTask);
            }
        }
        serverCall.connectServer("GET","tasks","",gotTasks)
    }

  });
