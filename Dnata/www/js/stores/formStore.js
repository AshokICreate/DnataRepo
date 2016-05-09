define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/formConstants");
    var serverCall = require ("util/serverCall");
    var JsonParser = require ("util/JSONParsers");
    var formData;
    var errorMsg;

    var actionParams = {
        "MS_INC_POTENTIAL_INJ_FORM":"INC_ACTION",
        "MS_INC_ACTUAL_INJURY":"FORM_ACTION"
    }

    var processCode = {
        "MS_INC_POTENTIAL_INJ_FORM":"MSI_INC_POTENTIAL_RPTR_WF",
        "MS_INC_ACTUAL_INJURY":"ACTUAL_INJURY_WF"
    }

    var currentStage = {
        "MS_INC_POTENTIAL_INJ_FORM":"CURRENT_STAGE",
        "MS_INC_ACTUAL_INJURY":"DD_CURRENT_STAGE"
    }

    var mimetype = [{"id":"35","text":"audio/mpegurl"},{"id":"36","text":"audio/ogg"},{"id":"33","text":"audio/midi"},
                    {"id":"34","text":"audio/mpeg"},{"id":"39","text":"image/jpeg"},{"id":"37","text":"image/gif"},
                    {"id":"38","text":"image/ief"},{"id":"43","text":"message/rfc822"},{"id":"42","text":"image/tiff"},
                    {"id":"41","text":"image/png"},{"id":"40","text":"image/pcx"},{"id":"67","text":"video/quicktime"},
                    {"id":"66","text":"video/mp4"},{"id":"69","text":"video/webm"},{"id":"68","text":"video/ogg"},
                    {"id":"22","text":"application/rtf"},{"id":"23","text":"application/sla"},
                    {"id":"24","text":"application/smil"},{"id":"25","text":"application/xml"},
                    {"id":"26","text":"application/zip"},{"id":"27","text":"audio/amr"},{"id":"28","text":"audio/amr"},
                    {"id":"29","text":"audio/annodex"},{"id":"3","text":"application/dicom"},
                    {"id":"2","text":"application/bbolin"},{"id":"1","text":"application/annodex"},
                    {"id":"7","text":"application/hta"},{"id":"30","text":"audio/basic"},
                    {"id":"6","text":"application/futuresplash"},{"id":"5","text":"application/ecmascript"},
                    {"id":"32","text":"audio/flac"},{"id":"4","text":"application/dsptype"},
                    {"id":"31","text":"audio/csound"},{"id":"9","text":"application/json"},
                    {"id":"8","text":"application/javascript"},{"id":"59","text":"video/annodex"},
                    {"id":"58","text":"video/3gpp"},{"id":"57","text":"text/texmacs"},{"id":"56","text":"text/scriptlet"},
                    {"id":"19","text":"application/pdf"},{"id":"55","text":"text/richtext"},{"id":"17","text":"application/ogg"},
                    {"id":"18","text":"application/onenote"},{"id":"15","text":"application/mxf"},
                    {"id":"16","text":"application/oda"},{"id":"13","text":"application/msaccess"},
                    {"id":"14","text":"application/msword"},{"id":"11","text":"application/mathematica"},
                    {"id":"12","text":"application/mbox"},{"id":"21","text":"application/rar"},
                    {"id":"20","text":"application/postscript"},{"id":"64","text":"video/mpeg"},{"id":"65","text":"video/MP2T"},
                    {"id":"62","text":"video/fli"},{"id":"63","text":"video/gl"},{"id":"102","text":"audio/x-caf"},
                    {"id":"60","text":"video/dl"},{"id":"101","text":"application/plcrashreport"},{"id":"61","text":"video/dv"},
                    {"id":"49","text":"text/csv"},{"id":"48","text":"text/css"},{"id":"45","text":"model/mesh"},
                    {"id":"44","text":"model/iges"},{"id":"47","text":"text/calendar"},{"id":"46","text":"model/vrml"},
                    {"id":"10","text":"application/m3g"},{"id":"51","text":"text/html"},{"id":"52","text":"text/iuls"},
                    {"id":"53","text":"text/mathml"},{"id":"54","text":"text/plain"},{"id":"50","text":"text/h323"}]

    var keysToShow ={
      "MS_INC_POTENTIAL_INJ_FORM":[
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
              ],
        "EQD":[
                "EQD_DAMAGE_EQUIP_TYP",
                "EQD_TYPE_OF_DAMAGE",
                "EQD_FLEET_NUMBER",
                "EQD_MODE_OF_OPN"
              ]

    }

    var keysToMandate = {

      "MS_INC_POTENTIAL_INJ_FORM":[
                                  "INC_DATE_AND_TIME",
                                  "INC_LOCATION_LKP",
                                  "INC_SUB_LOCATION_LKP",
                                  "INC_SUB_LOCATION_LOCALIZED_LKP",
                                  "INC_SHARED_ONLY_HEAD_SAFETY",
                                ],

       "MS_INC_ACTUAL_INJURY":[
                                  "INCIDENT_DATE",
                                  "INC_LOCATION",
                                  "INC_SUB_LOCATION",
                                  "EXACT_SUB_LOCATION",
                              ],
       "PSD":[
               "INJURED_PERSON_CAT",
               "INJURED_PERSON_NAME",
               "ACTIVITY_DURING_INJURY",
               "BODY_PART",
               "INJURIES_SUSTAINED",
               "MEDICAL_TREATMENT_RECIEVED"
              ],

      "FLY":[
              "FLIGHT_NUMBER_AVAIL",
              "CARRIER_NAME",
              "AIRCRAFT_TYPE",
              "REGISTRATION_NUMBER",
              "DAMAGE_ATTRIBUTABLE",
              "ARD_DAMAGE_TIME_ACTIVITY",
              "ARD_AIRCRAFT_DAMAGE",
              "ARD_DAMAGE_PART",
              "ARD_DAMAGE_TYPE",
              "ARD_DELAY_SEVERITY"
            ],

      "EQD":[
              "EQD_DAMAGE_EQUIP_TYP",
              "EQD_TYPE_OF_DAMAGE",
              "EQD_FLEET_NUMBER",
              "EQD_MODE_OF_OPN"
            ]

    }
    var FormStore = assign ({}, EventEmitter.prototype, {

      getError:function()
      {
          return errorMsg;
      },
      getData:function(){
          return formData;
      },
      getResorceData:function(url,callback)
      {
          var onResponse =  function(data,error)
          {
              if(error)
              {
                  errorMsg = error;
                  FormStore.emitChange(constants.On_Error);
              }else {
                  callback(data);
              }
          }

          serverCall.connectServer("GET",url,"",onResponse)
      },
      submitAttachments:function(files,callback)
      {
          var attachedServerObjects=[];
          var successUploads=[];
          var onSuccess = function(fileUrl,obj,error)
          {
              if(error)
              {
                  errorMsg = error;
                  FormStore.emitChange(constants.On_Error);

              }else {
                  var index = files.indexOf(fileUrl);
                  successUploads[index] = true;
                  attachedServerObjects.push(obj);

                  for(var i=0;i<successUploads.length;i++)
                  {
                      if(!successUploads[i])
                      {
                          uploadToServer(files[i],onSuccess);
                          return;
                      }
                  }
                  callback(attachedServerObjects);
              }
          }
          for(var i=0;i<files.length;i++)
          {
              successUploads.push(false);
              if(i==0)
              {
                  uploadToServer(files[i],onSuccess);
              }
          }

      },
      submitFormData:function(id,callback,action)
      {
          var onResponse =  function(data,error)
          {
              if(error)
              {
                  errorMsg = error;
                  FormStore.emitChange(constants.On_Error);
              }else {
                  callback(data);
              }
          }

          var obj = formData[id];
          var data = JSON.stringify(obj.data);
          serverCall.connectServer("PUT","tasks/"+obj.assignmentId+"/form?action="+action,data,onResponse);
      },
      getKeysToShow:function(id)
      {
        return keysToShow[id];
      },
      getKeysToMandate: function(id)
      {
        return keysToMandate[id];
      },
      isFieldRequired: function(id,key)
      {
        var array = keysToMandate[id];
        var isRequired = false;
        if(array && array.indexOf(key) > -1)
        {
          isRequired = true;
        }
        return isRequired;
      },
      getActionParam:function(id)
      {
        return actionParams[id];
      },
      getProcessCode:function(id)
      {
        return processCode[id];
      },
      getCurrentStageKey:function(id)
      {
        return currentStage[id];
      },
      emitChange: function(eventId) {
        this.emit(eventId);
      },
      addChangeListener: function(eventId,callback) {
        this.on(eventId, callback);
      },
      removeChangeListener: function(eventId,callback) {
        this.removeListener(eventId, callback);
      },
      clearFormData: function(){
        formData = undefined;
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
            return true;
        }
      }

      FormStore.emitChange(constants.NO_Change);
    });

    return FormStore;

    function uploadToServer(fileURL,callback)
    {
        var success = function (data,error) {
          if(error)
          {
            callback(fileURL,'',error);
          }
          callback(fileURL,data);
        }

        var fail = function (error) {
          callback(fileURL,'',error);
        }

        window.resolveLocalFileSystemURL(fileURL, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                var name =  file.name;

                if(name.indexOf(".") == -1)
                {
                    name = name + ".jpeg"
                }

                reader.onloadend = function(evt) {
                    var content = evt.target.result.split("data:image/jpeg;base64,")[1];
                    var params ={
                      "filename": name,
                      "description": "attachment",
                      "content":content,
                      "mimetype": "39"
                    }
                    var data = JSON.stringify(params);
                    serverCall.connectServer("POST","documents",data,success);
                }
                reader.readAsDataURL(file);
            },fail);
          }, fail);

    }

    function getFormData(id)
    {
        var assignmentId = "";
        var gotFormData = function(data,error)
        {
            if(error)
            {
                errorMsg = error;
                FormStore.emitChange(constants.On_Error);
            }
            var obj = {
                        assignmentId:assignmentId,
                        data:data
                      }
            if(!formData)
            {
              formData = {};
            }

            if(id==="MS_INC_ACTUAL_INJURY")
            {
                var content = obj.data.content;
                var array =  ["PSD","FLY","EQD"]

                var childContents = {};
                for(var i=0;i<array.length;i++)
                {
                  var childCon = content[array[i]][0];
                  var copied = jQuery.extend(true, {}, childCon);
                  childContents[array[i]] = copied;
                }

                obj["childContents"] = childContents;
            }
            formData[id] = obj;
            FormStore.emitChange(constants.Change_Data_Event);



          // if(data)
          // {
          //   JsonParser.parseJsonToFormContent("content",data,assignmentId,id);
          // }

        }
        var createdTask = function(data,error)
        {
            if(error)
            {
                errorMsg = error;
                FormStore.emitChange(constants.On_Error);
            }

            serverCall.connectServer("GET","tasks/"+data.assignmentId+"/form","",gotFormData);
            assignmentId = data.assignmentId;
        }

        serverCall.connectServer("POST","tasks?formname="+id,"",createdTask);

    }

  });
