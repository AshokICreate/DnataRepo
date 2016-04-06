define(function(require){


  /*

  //JsonParser.parseContent("", "content", "T-123-234-567", "InjuryForm");
  //JsonParser.getContentJson("content","T-123-234-567", "InjuryForm","");
  var whereparams = [{
    "tid":"T-123-234-567",
    "metricname":"InjuryForm"
  }];
  //db.deleteData("content",whereparams);
  JsonParser.updateContent("content","");

  */
  var db = require("./DBManager");

  var rowsToInsert = [];
  var contentJson = {
    "content":{}
  };
  var jsonobject =
    {
      "meta": {
        "mid": 101029,
        "pid": 44128,
        "iid": 264526,
        "title": "Actual injury or damage",
        "metricName": "MS_INC_ACTUAL_INJURY"
      },
      "structure": {
        "DD_OBJECT_TYPE": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Object Type",
          "required": "yes"
        },
        "DD_CURRENT_USER_NAME": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Current User Name",
          "required": "yes"
        },
        "DD_EVENT_USER_NAME": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Event User Name",
          "required": "yes"
        },
        "DD_ENTERPRISE_INFO": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Enterprise Info",
          "required": "yes"
        },
        "DD_CURRENT_STAGE": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Current Stage"
        },
        "DD_PROCESS_CODE": {
          "datatype": "STRING",
          "label": "Process Code",
          "required": "yes"
        },
        "INCIDENT_DATE": {
          "datatype": "DATE",
          "fieldtype": "CALENDAR",
          "label": "When did you see it happen?",
          "required": "yes"
        },
        "INCIDENT_TIME_HOURS": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "INCIDENT_TIME_HOURS",
          "resource": {
            "ref": "MS_INT_GET_HOURS_7",
            "source": "form"
          }
        },
        "INCIDENT_TIME_MINUTES": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "INCIDENT_TIME_MINUTES",
          "resource": {
            "ref": "MS_INT_GET_MINUTES_8",
            "source": "form"
          }
        },
        "ADN_WHILE": {
          "datatype": "STRING",
          "label": "What was the activity?"
        },
        "ADN_WAS": {
          "datatype": "STRING",
          "label": "What was the actual injury or damage?"
        },
        "ADN_BECAUSE": {
          "datatype": "STRING",
          "label": "Why did it happen?"
        },
        "INC_LOCATION": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "Where did it happen?",
          "required": "yes",
          "resource": {
            "ref": "MS_INC_Incident_Loc",
            "source": "external",
            "parameters": [
              {
                "ref": "COUNTRY",
                "value": "user_loc"
              }
            ]
          }
        },
        "INC_SUB_LOCATION": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "Which sub location?",
          "required": "yes",
          "resource": {
            "ref": "MS_INC_Sub_Location_Inf",
            "source": "external",
            "parameters": [
              {
                "ref": "INC_LOCATION",
                "value": "stored_value"
              }
            ]
          }
        },
        "EXACT_SUB_LOCATION": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "Where in the sub location?",
          "required": "yes",
          "resource": {
            "ref": "MS_INC_Where_In_Sub_Loc_Inf",
            "source": "external",
            "parameters": [
              {
                "ref": "INC_SUB_LOCATION",
                "value": "stored_value"
              }
            ]
          }
        },
        "INC_EXACT_LOCATION": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "Where exactly?",
          "resource": {
            "ref": "MS_INC_Incident_Exact_Loc_Inf",
            "source": "external",
            "parameters": [
              {
                "ref": "EXACT_SUB_LOCATION",
                "value": "stored_value"
              }
            ]
          }
        },
        "WITNESSES": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Were there any witnesses?",
          "required": "yes",
          "resource": {
            "ref": "MS_INC_Incident_Type_Reporting_16",
            "source": "form"
          }
        },
        "ADN_SUPPORTING_DOC": {
          "datatype": "STRING",
          "fieldtype": "ATTACHMENT",
          "label": "Please attach any supporting documents",
          "select": "multiple"
        },
        "WB_FLIGHT_IMPACTED": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Was there Flight that was impacted?"
        },
        "WB_FLIGHT_NO_AVAIL": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Flight Number Available"
        },
        "WB_FLIGHT_NUMBER": {
          "datatype": "STRING",
          "label": "Flight Number"
        },
        "WB_CARRIER_NAME": {
          "datatype": "STRING",
          "label": "Carrier Name"
        },
        "WB_AIRCRAFT_TYPE": {
          "datatype": "STRING",
          "label": "Aircraft Type"
        },
        "WB_REGISTRATION_NO": {
          "datatype": "STRING",
          "label": "Registration number"
        },
        "DGR_FLIGHT_IMPACTED": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Was there Flight that was impacted?"
        },
        "DGR_FLIGHT_NUMBER_AVAIL": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Flight Number Available"
        },
        "DGR_REGISTRATION_NO": {
          "datatype": "STRING",
          "label": "Registration Number"
        },
        "DGR_FLIGHT_NUMBER": {
          "datatype": "STRING",
          "label": "Flight Number"
        },
        "DGR_CARRIER_NAME": {
          "datatype": "STRING",
          "label": "Carrier Name"
        },
        "DGR_AIRCRAFT_TYPE": {
          "datatype": "STRING",
          "label": "Aircraft type"
        },
        "CLS_POSSIBLE_LINKED_INC": {
          "datatype": "STRING",
          "label": "Possible linked incidents"
        },
        "CLS_RESPONSIBLE_SECTIONS": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "Responsible sections",
          "resource": {
            "ref": "MS_INC_Incident_Section_Names",
            "source": "external",
            "parameters": [
              {
                "ref": "REQC_CLASSIFIER",
                "value": "user_id"
              }
            ]
          }
        },
        "CLS_RISK_BEHAVIOUR": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "At-Risk behaviors involved",
          "resource": {
            "ref": "MS_INC_Related_Risks_112",
            "source": "form"
          },
          "select": "multiple"
        },
        "CLS_LEVEL_OF_INVSTGN": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Level of investigation required for the incident",
          "resource": {
            "ref": "MS_INC_Incident_Type_Reporting_113",
            "source": "form"
          }
        },
        "FORM_ACTION": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Action",
          "resource": {
            "ref": "MS_INC_Actual_Action_Inf",
            "source": "external",
            "parameters": [
              {
                "ref": "DD_CURRENT_STAGE",
                "value": "current_stage"
              },
              {
                "ref": "DD_PROCESS_CODE",
                "value": "flow_id"
              },
              {
                "ref": "PREVIOUS_STAGE",
                "value": "previous_stage"
              },
              {
                "ref": "DD_CURRENT_USER_NAME",
                "value": "user_name"
              }
            ]
          }
        },
        "LEAD_INVESTIGATOR": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "Assign lead investigator",
          "resource": {
            "ref": "MS_INC_Lead_Investigator",
            "source": "external",
            "parameters": [
              {
                "ref": "COUNTRY",
                "value": "country"
              }
            ]
          }
        },
        "FORM_COMMENTS": {
          "datatype": "STRING",
          "label": "Do you have any additional comments?"
        },
        "CURRENT_STAGE": {
          "datatype": "STRING",
          "label": "CURRENT_STAGE"
        },
        "PREVIOUS_STAGE": {
          "datatype": "STRING",
          "label": "PREVIOUS_STAGE"
        },
        "FLOW_ID": {
          "datatype": "STRING",
          "label": "FLOW_ID"
        },
        "ACTION_ACKNOWLEDGE_FLAG": {
          "datatype": "STRING",
          "label": "ACTION_ACKNOWLEDGE_FLAG"
        },
        "FINAL_RPT_PUBLISH_FLG": {
          "datatype": "STRING",
          "label": "FINAL_RPT_PUBLISH_FLG"
        },
        "DUMMY_CHAR1": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR1"
        },
        "DUMMY_CHAR2": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR2"
        },
        "DUMMY_CHAR3": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR3"
        },
        "DUMMY_CHAR4": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR4"
        },
        "DUMMY_CHAR5": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR5"
        },
        "DUMMY_CHAR6": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR6"
        },
        "DUMMY_CHAR7": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR7"
        },
        "DUMMY_CHAR8": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR8"
        },
        "DUMMY_CHAR9": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR9"
        },
        "DUMMY_CHAR10": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR10"
        },
        "DUMMY_CHAR11": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR11"
        },
        "DUMMY_CHAR12": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR12"
        },
        "DUMMY_CHAR13": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR13"
        },
        "DUMMY_CHAR14": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR14"
        },
        "DUMMY_CHAR15": {
          "datatype": "STRING",
          "label": "DUMMY_CHAR15"
        },
        "DUMMY_DATE1": {
          "datatype": "DATE",
          "fieldtype": "CALENDAR",
          "label": "DUMMY_DATE1"
        },
        "DUMMY_DATE2": {
          "datatype": "DATE",
          "fieldtype": "CALENDAR",
          "label": "DUMMY_DATE2"
        },
        "DUMMY_DATE3": {
          "datatype": "DATE",
          "fieldtype": "CALENDAR",
          "label": "DUMMY_DATE3"
        },
        "DUMMY_DATE4": {
          "datatype": "DATE",
          "fieldtype": "CALENDAR",
          "label": "DUMMY_DATE4"
        },
        "COUNTRY": {
          "datatype": "STRING",
          "label": "Country"
        },
        "CHILD_METRIC_NAME": {
          "datatype": "STRING",
          "label": "CHILD_METRIC_NAME"
        },
        "CHILD_METRIC_ID": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "CHILD_METRIC_ID",
          "resource": {
            "ref": "MS_INC_Metric_ID",
            "source": "external",
            "parameters": [
              {
                "ref": "CHILD_METRIC_NAME",
                "value": "metric_name"
              }
            ]
          }
        },
        "REPORTING_OUTCOME": {
          "datatype": "STRING",
          "fieldtype": "POPUP",
          "label": "What was the outcome of the incident you are reporting",
          "resource": {
            "ref": "MS_INC_Incident_Type_Reporting_165",
            "source": "form"
          },
          "select": "multiple"
        },
        "CANCELLED_INCIDENT_FLAG": {
          "datatype": "STRING",
          "label": "CANCELLED_INCIDENT_FLAG"
        },
        "PARENT_INCIDENT_ID_FLAG": {
          "datatype": "STRING",
          "label": "PARENT_INCIDENT_ID_FLAG"
        },
        "SELECTED_TABS_ID": {
          "datatype": "STRING",
          "label": "SELECTED_TABS_ID"
        },
        "LINKED_INCIDENT_ID": {
          "datatype": "STRING",
          "label": "LINKED_INCIDENT_ID"
        },
        "PARENT_INCIDENT_ID": {
          "datatype": "STRING",
          "label": "PARENT_INCIDENT_ID"
        },
        "REQC_CLASSIFIER": {
          "datatype": "STRING",
          "label": "REQC_CLASSIFIER"
        },
        "FORM_PID": {
          "datatype": "STRING",
          "label": "FORM_PID"
        },
        "REPORTED_BY": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Reported By"
        },
        "REPORTED_USER_FULL_NAME": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Reported By"
        },
        "REPORTERS_DEPT": {
          "datatype": "STRING",
          "editable": "no",
          "fieldtype": "POPUP",
          "label": "Reporter's Department",
          "resource": {
            "ref": "MS_INC_User_Dept",
            "source": "external",
            "parameters": [
              {
                "ref": "REPORTED_BY",
                "value": "reporter_name"
              }
            ]
          }
        },
        "REPORTED_TIME": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Reported Date and Time"
        },
        "INCIDENT_DESCRIPTION": {
          "datatype": "STRING",
          "label": "Description of Incident"
        },
        "INCIDENT_NAME": {
          "datatype": "STRING",
          "label": "Incident Title"
        },
        "INC_STATUS": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Status"
        },
        "ACTUAL_INJURY_ID": {
          "datatype": "STRING",
          "editable": "no",
          "label": "Incident Reference Number"
        },
        "ADN_PROVIDE_INFO": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Would you like to provide any additional information?",
          "resource": {
            "ref": "MS_INC_Incident_Type_Reporting_181",
            "source": "form"
          }
        },
        "LOCATION_DETAILS": {
          "datatype": "STRING",
          "label": "Location Details"
        },
        "INC_REPORTED_AUTH": {
          "datatype": "STRING",
          "fieldtype": "DROPDOWN",
          "label": "Have you reported this occurrence to the appropriate authorities?",
          "resource": {
            "ref": "MS_INC_Incident_Type_Reporting_183",
            "source": "form"
          }
        },
        "PSD": {
          "INJURED_PERSON_CAT": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "Who was the injured person?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_18",
              "source": "form"
            }
          },
          "INJURED_PERSON_NAME": {
            "datatype": "STRING",
            "label": "What is the name of the injured person?"
          },
          "INJURED_PERSON_STAFF_NO": {
            "datatype": "STRING",
            "label": "What is the staff number of the person injured?"
          },
          "EMAIL_ADDRESS": {
            "datatype": "STRING",
            "label": "What is the email address of injured person?"
          },
          "INJURED_PERSON_JOB_TITLE": {
            "datatype": "STRING",
            "label": "What is the job title of the person injured?"
          },
          "INJURED_PERSON_DEPT": {
            "datatype": "STRING",
            "label": "Which department does the injured person belong to?"
          },
          "INJURED_PERSON_COMPANY": {
            "datatype": "STRING",
            "label": "What is the company of the person injured?"
          },
          "INJURED_PERSON_MGR": {
            "datatype": "STRING",
            "label": "Who is the supervisor/manager of the person injured?"
          },
          "ACTIVITY_DURING_INJURY": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What activity was the person involved in when he/she was injured?",
            "resource": {
              "ref": "MS_INC_Activity_Time_Of_Injury",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "BODY_PART": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "Where on the body did the person get injured?",
            "resource": {
              "ref": "MS_INC_INJURED_BODY_PART_INF_27",
              "source": "form"
            },
            "select": "multiple"
          },
          "INJURIES_SUSTAINED": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of injuries did the person sustain?",
            "resource": {
              "ref": "MS_INC_Types_Of_Injuries",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            },
            "select": "multiple"
          },
          "MEDICAL_TREATMENT_RECIEVED": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What medical treatment did the person receive?",
            "resource": {
              "ref": "MS_INC_Medical_Treatment_Recieved",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "PSD_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "PSD Incident Reference Name Hidden"
          },
          "PSD_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "PSD_UNIQUE_KEY"
          },
          "INC_LEFT_RIGHT_BODY_PART": {
            "datatype": "STRING",
            "editable": "no",
            "label": "Where on the body did the person get injured?"
          },
          "INC_BODY_IMAGE": {
            "datatype": "STRING",
            "label": "INC_BODY_IMAGE"
          },
          "meta": {
            "multiId": 100053
          }
        },
        "FLY": {
          "FLIGHT_NUMBER_AVAIL": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "Do you know the flight number?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_34",
              "source": "form"
            }
          },
          "FLIGHT_NUMBER": {
            "datatype": "STRING",
            "label": "What is the flight number of the damaged aircraft?"
          },
          "CARRIER_NAME": {
            "datatype": "STRING",
            "label": "What is the carrier name?"
          },
          "AIRCRAFT_TYPE": {
            "datatype": "STRING",
            "label": "What is the aircraft type?"
          },
          "REGISTRATION_NUMBER": {
            "datatype": "STRING",
            "label": "What is the registration number?"
          },
          "DAMAGE_ATTRIBUTABLE": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "Was the aircraft damage attributable to dnata?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_39",
              "source": "form"
            }
          },
          "FLY_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "FLY Incident Reference Name Hidden"
          },
          "INCIDENT_CAUSED_BY": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "Who was the equipment operator?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_41",
              "source": "form"
            }
          },
          "INC_CAUSE_STAFF_NO": {
            "datatype": "STRING",
            "label": "What is the staff number of the person?"
          },
          "INC_CAUSE_STAFF_NAME": {
            "datatype": "STRING",
            "label": "What is the staff name/person name?"
          },
          "INC_CAUSE_PER_CONTACT": {
            "datatype": "STRING",
            "label": "What is the contact number?"
          },
          "INC_CAUSE_JOB_TITLE": {
            "datatype": "STRING",
            "label": "What is the job title of the person?"
          },
          "INC_CAUSE_STAFF_DEPT": {
            "datatype": "STRING",
            "label": "Which department does the person belong to?"
          },
          "INC_CAUSE_PERS_COMP": {
            "datatype": "STRING",
            "label": "What is the company of the person?"
          },
          "INC_CAUSE_PERS_MGR": {
            "datatype": "STRING",
            "label": "Who is the supervisor/manager of the person?"
          },
          "ARD_EQUIPMENT_TYPE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What equipment was involved?",
            "resource": {
              "ref": "MS_INC_Equipment_Type",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "ARD_FLEET_NUMBER": {
            "datatype": "STRING",
            "label": "What is the fleet number?"
          },
          "ARD_DAMAGE_TIME_ACTIVITY": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "During which activity was the damage found/caused?",
            "resource": {
              "ref": "MS_INC_Activity_Aircraft_Damage",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "ARD_AIRCRAFT_DAMAGE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "Where on the aircraft, was the damage found/caused?",
            "resource": {
              "ref": "MS_INC_Aircraft_Damaged_Place",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "ARD_DAMAGE_PART": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "Which part of the aircraft was damaged?",
            "resource": {
              "ref": "MS_INC_Incident_Aircraft_Parts_Inf",
              "source": "external",
              "parameters": [
                {
                  "ref": "ARD_AIRCRAFT_DAMAGE",
                  "value": "stored_value"
                }
              ]
            },
            "select": "multiple"
          },
          "ARD_DAMAGE_TYPE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of damage was found/caused?",
            "resource": {
              "ref": "MS_INC_Aircraft_Damage_Type",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_country"
                }
              ]
            },
            "select": "multiple"
          },
          "ARD_DELAY_SEVERITY": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What delay did the damage cause?",
            "resource": {
              "ref": "MS_INC_Severity_Delay_Departure",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "FLY_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "FLY_UNIQUE_KEY"
          },
          "DAMAGE_CAUSED_BY": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "What caused the damage?",
            "resource": {
              "ref": "MS_INC_Aircraft_Damage_Cause_57",
              "source": "form"
            }
          },
          "ARD_DAMAGE_SEVERITY": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What is the severity of the damage (as assessed by the engineer)?",
            "resource": {
              "ref": "MS_INC_Severity_Of_Damage",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "ARD_DAMAGE_DELAY": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "Did the damage cause a delay in departure?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_59",
              "source": "form"
            }
          },
          "meta": {
            "multiId": 100052
          }
        },
        "WAB": {
          "WB_TYPE_OF_WEIGHT": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of weight and balance incident occurred?",
            "resource": {
              "ref": "MS_INC_Type_of_Weight",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "WB_ACTIVITY_INVOLVED": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What was the reason?",
            "resource": {
              "ref": "MS_INC_WB_Activity_Inf",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "country"
                },
                {
                  "ref": "WB_TYPE_OF_WEIGHT",
                  "value": "parent_stored_value"
                }
              ]
            }
          },
          "WB_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "WB_UNIQUE_KEY"
          },
          "WAB_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "WAB Incident Reference Name Hidden"
          },
          "meta": {
            "multiId": 100056
          }
        },
        "SBR": {
          "SB_TYPE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of security breach occurred?",
            "resource": {
              "ref": "MS_INC_Type_Of_Security_Breaches",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "SB_ACTIVITY_INVOLVED": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What was the reason?",
            "resource": {
              "ref": "MS_INC_Security_Breach_Activity",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "country"
                }
              ]
            },
            "select": "multiple"
          },
          "SB_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "SB_UNIQUE_KEY"
          },
          "SBR_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "SBR Incident Reference Name Hidden"
          },
          "meta": {
            "multiId": 100049
          }
        },
        "DGR": {
          "DGR_ACT_GOODS": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "During which activity were the dangerous goods found?",
            "resource": {
              "ref": "MS_INC_Act_During_DG_Found",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "DGR_GOODS_IMPACT": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What was the impact of the dangerous goods?",
            "resource": {
              "ref": "MS_INC_Dangerous_Goods_Impact",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "DGR_GOODS_TYPE": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "What were the type of dangerous goods were found?",
            "resource": {
              "ref": "MS_INC_Type_Of_Dangerous_Goods_76",
              "source": "form"
            }
          },
          "DGR_GOODS_DETAILS": {
            "datatype": "STRING",
            "label": "Please provide the details"
          },
          "DGR_UN_NO_AVAIL": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "Is the UN number available?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_78",
              "source": "form"
            }
          },
          "DGR_UN_NUMBER": {
            "datatype": "STRING",
            "label": "What is the UN number?"
          },
          "DGR_AIRWAY_BILL_NO": {
            "datatype": "STRING",
            "label": "What is the airway bill number?"
          },
          "DGR_NO_OF_PIECES": {
            "datatype": "DECIMAL",
            "label": "How many number of pieces?"
          },
          "DGR_WEIGHT": {
            "datatype": "DECIMAL",
            "label": "What was the weight (kg)?"
          },
          "DGR_VALUE": {
            "datatype": "DECIMAL",
            "label": "What was the value?"
          },
          "DGR_PASSENGER_NAME": {
            "datatype": "STRING",
            "label": "What is the passenger name?"
          },
          "DGR_BAG_TAG_NO": {
            "datatype": "STRING",
            "label": "What is the baggage tag number?"
          },
          "DGR_BAGGAGE_QUANTITY": {
            "datatype": "DECIMAL",
            "label": "How much was the baggage quantity?"
          },
          "DGR_AV7_NUMBER": {
            "datatype": "DECIMAL",
            "label": "What is the AV7 number?"
          },
          "DGR_QUANTITY": {
            "datatype": "DECIMAL",
            "label": "How much was the quantity?"
          },
          "DGR_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "DGR_UNIQUE_KEY"
          },
          "DGR_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "DGR Incident Reference Name Hidden"
          },
          "meta": {
            "multiId": 100054
          }
        },
        "EQD": {
          "EQD_DAMAGE_EQUIP_TYP": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of GSE was damaged?",
            "resource": {
              "ref": "MS_INC_Equipment_Type",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "EQD_TYPE_OF_DAMAGE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of damage occured?",
            "resource": {
              "ref": "MS_INC_Type_Of_Damage_Equipment",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "EQD_FLEET_NUMBER": {
            "datatype": "STRING",
            "label": "What was the fleet number?"
          },
          "EQD_DAMAGE_DETAILS": {
            "datatype": "STRING",
            "label": "Detail of damage"
          },
          "EQD_MODE_OF_OPN": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What was the mode of operation when the damage occurred?",
            "resource": {
              "ref": "MS_INC_Mode_Of_Operation",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "EQD_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "EQD_UNIQUE_KEY"
          },
          "EQD_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "EQD Incident Reference Name Hidden"
          },
          "meta": {
            "multiId": 100055
          }
        },
        "PRD": {
          "PRD_PROPERTY_DAMAGE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What is the category of property that was damaged?",
            "resource": {
              "ref": "MS_INC_Property_Damage",
              "source": "external",
              "parameters": [
                {
                  "ref": "COUNTRY",
                  "value": "user_loc"
                }
              ]
            }
          },
          "PRD_TYPE_OF_DAMAGE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of damage occurred to the property?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_105",
              "source": "form"
            }
          },
          "PRD_DAMAGE_DETAIL": {
            "datatype": "STRING",
            "label": "Detail of damage"
          },
          "PRD_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "PRD_UNIQUE_KEY"
          },
          "PRD_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "PRD Incident Reference Name Hidden"
          },
          "PROPERTY_SUB_CATEGORY": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What is the sub-category of the property damaged?",
            "resource": {
              "ref": "MS_INC_Property_Sub_Category",
              "source": "external",
              "parameters": [
                {
                  "ref": "PRD_PROPERTY_DAMAGE",
                  "value": "stored_value"
                }
              ]
            }
          },
          "meta": {
            "multiId": 100051
          }
        },
        "PAE": {
          "PAE_PLANT_DAMAGE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What is the category of plant and equipment that was damaged?",
            "resource": {
              "ref": "MS_INC_Plant_Equipment_Category_114",
              "source": "form"
            }
          },
          "PAE_PLANT_SUB_CATEGORY": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What is the sub-category of the plant and equipment damaged?",
            "resource": {
              "ref": "MS_INC_Plant_Equipment_Sub_Cat",
              "source": "external",
              "parameters": [
                {
                  "ref": "PAE_PLANT_DAMAGE",
                  "value": "stored_value"
                }
              ]
            }
          },
          "PAE_TYPE_OF_DAMAGE": {
            "datatype": "STRING",
            "fieldtype": "POPUP",
            "label": "What type of damage occurred to the plant and equipment?",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_116",
              "source": "form"
            }
          },
          "PAE_DAMAGE_DETAIL": {
            "datatype": "STRING",
            "label": "PAE_DAMAGE_DETAIL"
          },
          "PAE_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "PAE_UNIQUE_KEY"
          },
          "PAE_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "PAE Incident Reference Name Hidden"
          },
          "meta": {
            "multiId": 100074
          }
        },
        "WIT": {
          "WITNESS_CATEGORY": {
            "datatype": "STRING",
            "fieldtype": "DROPDOWN",
            "label": "Witness category",
            "resource": {
              "ref": "MS_INC_Incident_Type_Reporting_120",
              "source": "form"
            }
          },
          "WITNESS_NAME": {
            "datatype": "STRING",
            "label": "What is name of the witness?"
          },
          "WITNESS_STAFF_NO": {
            "datatype": "STRING",
            "label": "What is the staff number of the witness?"
          },
          "WIT_CONTACT_INFO": {
            "datatype": "STRING",
            "label": "Witness contact information"
          },
          "WITNESS_JOB_TITLE": {
            "datatype": "STRING",
            "label": "What is the job title of the witness?"
          },
          "WITNESS_DEPT": {
            "datatype": "STRING",
            "label": "Which department does the witness belong to?"
          },
          "WITNESS_COMPANY": {
            "datatype": "STRING",
            "label": "Company of the witness"
          },
          "WITNESS_MGR": {
            "datatype": "STRING",
            "label": "Supervisor/manager of the witness"
          },
          "WIT_EMPLOYEE_LOOKUP": {
            "datatype": "STRING",
            "label": "Employee lookup"
          },
          "WIT_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "WIT Incident Reference Name Hidden"
          },
          "WIT_UNIQUE_KEY": {
            "datatype": "STRING",
            "label": "WIT_UNIQUE_KEY"
          },
          "meta": {
            "multiId": 100050
          }
        },
        "SLK": {
          "SUPPORTING_URLS": {
            "datatype": "STRING",
            "label": "Supporting URLs"
          },
          "SUPPORTING_LINK_KEY": {
            "datatype": "STRING",
            "label": "SUPPORTING_LINK_KEY"
          },
          "HYPER_SUPPORTING_LINKS": {
            "datatype": "STRING",
            "label": "Supporting URLs"
          },
          "SLK_ACTUAL_INJURY_ID": {
            "datatype": "STRING",
            "label": "SLK Incident Reference Name Hidden"
          },
          "meta": {
            "multiId": 100048
          }
        }
      },
      "content": {
        "DD_OBJECT_TYPE": {
          "value": "MS_INC_ACTUAL_INJURY"
        },
        "DD_CURRENT_USER_NAME": {
          "value": "s130906"
        },
        "DD_EVENT_USER_NAME": {
          "value": "s130906"
        },
        "DD_ENTERPRISE_INFO": {
          "value": "dnata"
        },
        "DD_CURRENT_STAGE": {
          "value": ""
        },
        "DD_PROCESS_CODE": {
          "value": ""
        },
        "INCIDENT_DATE": {
          "value": ""
        },
        "INCIDENT_TIME_HOURS": {
          "value": ""
        },
        "INCIDENT_TIME_MINUTES": {
          "value": ""
        },
        "ADN_WHILE": {
          "value": ""
        },
        "ADN_WAS": {
          "value": ""
        },
        "ADN_BECAUSE": {
          "value": ""
        },
        "INC_LOCATION": {
          "value": ""
        },
        "INC_SUB_LOCATION": {
          "value": ""
        },
        "EXACT_SUB_LOCATION": {
          "value": ""
        },
        "INC_EXACT_LOCATION": {
          "value": ""
        },
        "WITNESSES": {
          "value": ""
        },
        "ADN_SUPPORTING_DOC": [],
        "WB_FLIGHT_IMPACTED": {
          "value": ""
        },
        "WB_FLIGHT_NO_AVAIL": {
          "value": ""
        },
        "WB_FLIGHT_NUMBER": {
          "value": ""
        },
        "WB_CARRIER_NAME": {
          "value": ""
        },
        "WB_AIRCRAFT_TYPE": {
          "value": ""
        },
        "WB_REGISTRATION_NO": {
          "value": ""
        },
        "DGR_FLIGHT_IMPACTED": {
          "value": ""
        },
        "DGR_FLIGHT_NUMBER_AVAIL": {
          "value": ""
        },
        "DGR_REGISTRATION_NO": {
          "value": ""
        },
        "DGR_FLIGHT_NUMBER": {
          "value": ""
        },
        "DGR_CARRIER_NAME": {
          "value": ""
        },
        "DGR_AIRCRAFT_TYPE": {
          "value": ""
        },
        "CLS_POSSIBLE_LINKED_INC": {
          "value": ""
        },
        "CLS_RESPONSIBLE_SECTIONS": {
          "value": ""
        },
        "CLS_RISK_BEHAVIOUR": [],
        "CLS_LEVEL_OF_INVSTGN": {
          "value": ""
        },
        "FORM_ACTION": {
          "value": ""
        },
        "LEAD_INVESTIGATOR": {
          "value": ""
        },
        "FORM_COMMENTS": {
          "value": ""
        },
        "CURRENT_STAGE": {
          "value": ""
        },
        "PREVIOUS_STAGE": {
          "value": ""
        },
        "FLOW_ID": {
          "value": ""
        },
        "ACTION_ACKNOWLEDGE_FLAG": {
          "value": ""
        },
        "FINAL_RPT_PUBLISH_FLG": {
          "value": ""
        },
        "DUMMY_CHAR1": {
          "value": ""
        },
        "DUMMY_CHAR2": {
          "value": ""
        },
        "DUMMY_CHAR3": {
          "value": ""
        },
        "DUMMY_CHAR4": {
          "value": ""
        },
        "DUMMY_CHAR5": {
          "value": ""
        },
        "DUMMY_CHAR6": {
          "value": ""
        },
        "DUMMY_CHAR7": {
          "value": ""
        },
        "DUMMY_CHAR8": {
          "value": ""
        },
        "DUMMY_CHAR9": {
          "value": ""
        },
        "DUMMY_CHAR10": {
          "value": ""
        },
        "DUMMY_CHAR11": {
          "value": ""
        },
        "DUMMY_CHAR12": {
          "value": ""
        },
        "DUMMY_CHAR13": {
          "value": ""
        },
        "DUMMY_CHAR14": {
          "value": ""
        },
        "DUMMY_CHAR15": {
          "value": ""
        },
        "DUMMY_DATE1": {
          "value": ""
        },
        "DUMMY_DATE2": {
          "value": ""
        },
        "DUMMY_DATE3": {
          "value": ""
        },
        "DUMMY_DATE4": {
          "value": ""
        },
        "COUNTRY": {
          "value": "ZRH"
        },
        "CHILD_METRIC_NAME": {
          "value": ""
        },
        "CHILD_METRIC_ID": {
          "value": ""
        },
        "REPORTING_OUTCOME": [],
        "CANCELLED_INCIDENT_FLAG": {
          "value": ""
        },
        "PARENT_INCIDENT_ID_FLAG": {
          "value": ""
        },
        "SELECTED_TABS_ID": {
          "value": ""
        },
        "LINKED_INCIDENT_ID": {
          "value": ""
        },
        "PARENT_INCIDENT_ID": {
          "value": ""
        },
        "REQC_CLASSIFIER": {
          "value": ""
        },
        "FORM_PID": {
          "value": ""
        },
        "REPORTED_BY": {
          "value": ""
        },
        "REPORTED_USER_FULL_NAME": {
          "value": "ZRH_BAPP Member_SC_106"
        },
        "REPORTERS_DEPT": {
          "value": ""
        },
        "REPORTED_TIME": {
          "value": ""
        },
        "INCIDENT_DESCRIPTION": {
          "value": ""
        },
        "INCIDENT_NAME": {
          "value": ""
        },
        "INC_STATUS": {
          "value": ""
        },
        "ACTUAL_INJURY_ID": {
          "value": ""
        },
        "ADN_PROVIDE_INFO": {
          "value": ""
        },
        "LOCATION_DETAILS": {
          "value": ""
        },
        "INC_REPORTED_AUTH": {
          "value": ""
        },
        "SLK": [
          {
            "SUPPORTING_URLS": {
              "value": ""
            },
            "SUPPORTING_LINK_KEY": {
              "value": ""
            },
            "HYPER_SUPPORTING_LINKS": {
              "value": ""
            },
            "SLK_ACTUAL_INJURY_ID": {
              "value": ""
            }
          }
        ],
        "SBR": [
          {
            "SB_TYPE": {
              "value": ""
            },
            "SB_ACTIVITY_INVOLVED": [],
            "SB_UNIQUE_KEY": {
              "value": ""
            },
            "SBR_ACTUAL_INJURY_ID": {
              "value": ""
            }
          }
        ],
        "WIT": [
          {
            "WITNESS_CATEGORY": {
              "value": ""
            },
            "WITNESS_NAME": {
              "value": ""
            },
            "WITNESS_STAFF_NO": {
              "value": ""
            },
            "WIT_CONTACT_INFO": {
              "value": ""
            },
            "WITNESS_JOB_TITLE": {
              "value": ""
            },
            "WITNESS_DEPT": {
              "value": ""
            },
            "WITNESS_COMPANY": {
              "value": ""
            },
            "WITNESS_MGR": {
              "value": ""
            },
            "WIT_EMPLOYEE_LOOKUP": {
              "value": ""
            },
            "WIT_ACTUAL_INJURY_ID": {
              "value": ""
            },
            "WIT_UNIQUE_KEY": {
              "value": ""
            }
          }
        ],
        "PRD": [
          {
            "PRD_PROPERTY_DAMAGE": {
              "value": ""
            },
            "PRD_TYPE_OF_DAMAGE": {
              "value": ""
            },
            "PRD_DAMAGE_DETAIL": {
              "value": ""
            },
            "PRD_UNIQUE_KEY": {
              "value": ""
            },
            "PRD_ACTUAL_INJURY_ID": {
              "value": ""
            },
            "PROPERTY_SUB_CATEGORY": {
              "value": ""
            }
          }
        ],
        "FLY": [
          {
            "FLIGHT_NUMBER_AVAIL": {
              "value": ""
            },
            "FLIGHT_NUMBER": {
              "value": ""
            },
            "CARRIER_NAME": {
              "value": ""
            },
            "AIRCRAFT_TYPE": {
              "value": ""
            },
            "REGISTRATION_NUMBER": {
              "value": ""
            },
            "DAMAGE_ATTRIBUTABLE": {
              "value": ""
            },
            "FLY_ACTUAL_INJURY_ID": {
              "value": ""
            },
            "INCIDENT_CAUSED_BY": {
              "value": ""
            },
            "INC_CAUSE_STAFF_NO": {
              "value": ""
            },
            "INC_CAUSE_STAFF_NAME": {
              "value": ""
            },
            "INC_CAUSE_PER_CONTACT": {
              "value": ""
            },
            "INC_CAUSE_JOB_TITLE": {
              "value": ""
            },
            "INC_CAUSE_STAFF_DEPT": {
              "value": ""
            },
            "INC_CAUSE_PERS_COMP": {
              "value": ""
            },
            "INC_CAUSE_PERS_MGR": {
              "value": ""
            },
            "ARD_EQUIPMENT_TYPE": {
              "value": ""
            },
            "ARD_FLEET_NUMBER": {
              "value": ""
            },
            "ARD_DAMAGE_TIME_ACTIVITY": {
              "value": ""
            },
            "ARD_AIRCRAFT_DAMAGE": {
              "value": ""
            },
            "ARD_DAMAGE_PART": [],
            "ARD_DAMAGE_TYPE": [],
            "ARD_DELAY_SEVERITY": {
              "value": ""
            },
            "FLY_UNIQUE_KEY": {
              "value": ""
            },
            "DAMAGE_CAUSED_BY": {
              "value": ""
            },
            "ARD_DAMAGE_SEVERITY": {
              "value": ""
            },
            "ARD_DAMAGE_DELAY": {
              "value": ""
            }
          }
        ],
        "PSD": [
          {
            "INJURED_PERSON_CAT": {
              "value": ""
            },
            "INJURED_PERSON_NAME": {
              "value": ""
            },
            "INJURED_PERSON_STAFF_NO": {
              "value": ""
            },
            "EMAIL_ADDRESS": {
              "value": ""
            },
            "INJURED_PERSON_JOB_TITLE": {
              "value": ""
            },
            "INJURED_PERSON_DEPT": {
              "value": ""
            },
            "INJURED_PERSON_COMPANY": {
              "value": ""
            },
            "INJURED_PERSON_MGR": {
              "value": ""
            },
            "ACTIVITY_DURING_INJURY": {
              "value": ""
            },
            "BODY_PART": [],
            "INJURIES_SUSTAINED": [],
            "MEDICAL_TREATMENT_RECIEVED": {
              "value": ""
            },
            "PSD_ACTUAL_INJURY_ID": {
              "value": ""
            },
            "PSD_UNIQUE_KEY": {
              "value": ""
            },
            "INC_LEFT_RIGHT_BODY_PART": {
              "value": ""
            },
            "INC_BODY_IMAGE": {
              "value": ""
            }
          }
        ],
        "DGR": [
          {
            "DGR_ACT_GOODS": {
              "value": ""
            },
            "DGR_GOODS_IMPACT": {
              "value": ""
            },
            "DGR_GOODS_TYPE": {
              "value": ""
            },
            "DGR_GOODS_DETAILS": {
              "value": ""
            },
            "DGR_UN_NO_AVAIL": {
              "value": ""
            },
            "DGR_UN_NUMBER": {
              "value": ""
            },
            "DGR_AIRWAY_BILL_NO": {
              "value": ""
            },
            "DGR_NO_OF_PIECES": {
              "value": ""
            },
            "DGR_WEIGHT": {
              "value": ""
            },
            "DGR_VALUE": {
              "value": ""
            },
            "DGR_PASSENGER_NAME": {
              "value": ""
            },
            "DGR_BAG_TAG_NO": {
              "value": ""
            },
            "DGR_BAGGAGE_QUANTITY": {
              "value": ""
            },
            "DGR_AV7_NUMBER": {
              "value": ""
            },
            "DGR_QUANTITY": {
              "value": ""
            },
            "DGR_UNIQUE_KEY": {
              "value": ""
            },
            "DGR_ACTUAL_INJURY_ID": {
              "value": ""
            }
          }
        ],
        "EQD": [
          {
            "EQD_DAMAGE_EQUIP_TYP": {
              "value": ""
            },
            "EQD_TYPE_OF_DAMAGE": {
              "value": ""
            },
            "EQD_FLEET_NUMBER": {
              "value": ""
            },
            "EQD_DAMAGE_DETAILS": {
              "value": ""
            },
            "EQD_MODE_OF_OPN": {
              "value": ""
            },
            "EQD_UNIQUE_KEY": {
              "value": ""
            },
            "EQD_ACTUAL_INJURY_ID": {
              "value": ""
            }
          }
        ],
        "WAB": [
          {
            "WB_TYPE_OF_WEIGHT": {
              "value": ""
            },
            "WB_ACTIVITY_INVOLVED": {
              "value": ""
            },
            "WB_UNIQUE_KEY": {
              "value": ""
            },
            "WAB_ACTUAL_INJURY_ID": {
              "value": ""
            }
          }
        ],
        "PAE": [
          {
            "PAE_PLANT_DAMAGE": {
              "value": ""
            },
            "PAE_PLANT_SUB_CATEGORY": {
              "value": ""
            },
            "PAE_TYPE_OF_DAMAGE": {
              "value": ""
            },
            "PAE_DAMAGE_DETAIL": {
              "value": ""
            },
            "PAE_UNIQUE_KEY": {
              "value": ""
            },
            "PAE_ACTUAL_INJURY_ID": {
              "value": ""
            }
          }
        ]
      },
      "resources": {
        "MS_INT_GET_HOURS_7": {
          "0": {
            "value": "00"
          },
          "1": {
            "value": "01"
          },
          "2": {
            "value": "02"
          },
          "3": {
            "value": "03"
          },
          "4": {
            "value": "04"
          },
          "5": {
            "value": "05"
          },
          "6": {
            "value": "06"
          },
          "7": {
            "value": "07"
          },
          "8": {
            "value": "08"
          },
          "9": {
            "value": "09"
          },
          "10": {
            "value": "10"
          },
          "11": {
            "value": "11"
          },
          "12": {
            "value": "12"
          },
          "13": {
            "value": "13"
          },
          "14": {
            "value": "14"
          },
          "15": {
            "value": "15"
          },
          "16": {
            "value": "16"
          },
          "17": {
            "value": "17"
          },
          "18": {
            "value": "18"
          },
          "19": {
            "value": "19"
          },
          "20": {
            "value": "20"
          },
          "21": {
            "value": "21"
          },
          "22": {
            "value": "22"
          },
          "23": {
            "value": "23"
          }
        },
        "MS_INT_GET_MINUTES_8": {
          "0": {
            "value": "00"
          },
          "1": {
            "value": "01"
          },
          "2": {
            "value": "02"
          },
          "3": {
            "value": "03"
          },
          "4": {
            "value": "04"
          },
          "5": {
            "value": "05"
          },
          "6": {
            "value": "06"
          },
          "7": {
            "value": "07"
          },
          "8": {
            "value": "08"
          },
          "9": {
            "value": "09"
          },
          "10": {
            "value": "10"
          },
          "11": {
            "value": "11"
          },
          "12": {
            "value": "12"
          },
          "13": {
            "value": "13"
          },
          "14": {
            "value": "14"
          },
          "15": {
            "value": "15"
          },
          "16": {
            "value": "16"
          },
          "17": {
            "value": "17"
          },
          "18": {
            "value": "18"
          },
          "19": {
            "value": "19"
          },
          "20": {
            "value": "20"
          },
          "21": {
            "value": "21"
          },
          "22": {
            "value": "22"
          },
          "23": {
            "value": "23"
          },
          "24": {
            "value": "24"
          },
          "25": {
            "value": "25"
          },
          "26": {
            "value": "26"
          },
          "27": {
            "value": "27"
          },
          "28": {
            "value": "28"
          },
          "29": {
            "value": "29"
          },
          "30": {
            "value": "30"
          },
          "31": {
            "value": "31"
          },
          "32": {
            "value": "32"
          },
          "33": {
            "value": "33"
          },
          "34": {
            "value": "34"
          },
          "35": {
            "value": "35"
          },
          "36": {
            "value": "36"
          },
          "37": {
            "value": "37"
          },
          "38": {
            "value": "38"
          },
          "39": {
            "value": "39"
          },
          "40": {
            "value": "40"
          },
          "41": {
            "value": "41"
          },
          "42": {
            "value": "42"
          },
          "43": {
            "value": "43"
          },
          "44": {
            "value": "44"
          },
          "45": {
            "value": "45"
          },
          "46": {
            "value": "46"
          },
          "47": {
            "value": "47"
          },
          "48": {
            "value": "48"
          },
          "49": {
            "value": "49"
          },
          "50": {
            "value": "50"
          },
          "51": {
            "value": "51"
          },
          "52": {
            "value": "52"
          },
          "53": {
            "value": "53"
          },
          "54": {
            "value": "54"
          },
          "55": {
            "value": "55"
          },
          "56": {
            "value": "56"
          },
          "57": {
            "value": "57"
          },
          "58": {
            "value": "58"
          },
          "59": {
            "value": "59"
          }
        },
        "MS_INC_Incident_Type_Reporting_16": {
          "1": {
            "value": "Yes"
          },
          "2": {
            "value": "No"
          }
        },
        "MS_INC_Incident_Type_Reporting_18": {
          "1": {
            "value": "Employee"
          },
          "2": {
            "value": "Third party"
          },
          "3": {
            "value": "Customer"
          },
          "4": {
            "value": "Don't know"
          }
        },
        "MS_INC_INJURED_BODY_PART_INF_27": {
          "1001": {
            "value": "Eye"
          },
          "1002": {
            "value": "Ear"
          },
          "1003": {
            "value": "Head"
          },
          "1004": {
            "value": "Face"
          },
          "1005": {
            "value": "Neck"
          },
          "1006": {
            "value": "Back"
          },
          "1007": {
            "value": "Chest"
          },
          "1008": {
            "value": "Shoulders"
          },
          "1009": {
            "value": "Arms"
          },
          "1010": {
            "value": "Hands"
          },
          "1011": {
            "value": "Fingers"
          },
          "1012": {
            "value": "Hips"
          },
          "1013": {
            "value": "Legs"
          },
          "1014": {
            "value": "Feet"
          },
          "1015": {
            "value": "Toes"
          },
          "1016": {
            "value": "Buttocks"
          },
          "1017": {
            "value": "Lower Back"
          },
          "1018": {
            "value": "Internal organs"
          }
        },
        "MS_INC_Incident_Type_Reporting_34": {
          "1": {
            "value": "Yes"
          },
          "2": {
            "value": "No"
          }
        },
        "MS_INC_Incident_Type_Reporting_39": {
          "1": {
            "value": "Yes"
          },
          "2": {
            "value": "No"
          }
        },
        "MS_INC_Incident_Type_Reporting_41": {
          "1": {
            "value": "Employee"
          },
          "2": {
            "value": "Third party"
          },
          "3": {
            "value": "Customer"
          },
          "4": {
            "value": "Don't know"
          }
        },
        "MS_INC_Aircraft_Damage_Cause_57": {
          "1": {
            "value": "Person"
          },
          "2": {
            "value": "Equipment"
          }
        },
        "MS_INC_Incident_Type_Reporting_59": {
          "1": {
            "value": "Yes"
          },
          "2": {
            "value": "No"
          }
        },
        "MS_INC_Type_Of_Dangerous_Goods_76": {
          "1": {
            "value": "Cargo"
          },
          "2": {
            "value": "Baggage"
          },
          "3": {
            "value": "Mail"
          },
          "4": {
            "value": "Other"
          }
        },
        "MS_INC_Incident_Type_Reporting_78": {
          "1": {
            "value": "Yes"
          },
          "2": {
            "value": "No"
          }
        },
        "MS_INC_Incident_Type_Reporting_105": {
          "1": {
            "value": "Detached"
          },
          "2": {
            "value": "Broken"
          },
          "3": {
            "value": "Dented"
          },
          "4": {
            "value": "Scratched"
          },
          "5": {
            "value": "Punctured or deflated"
          },
          "6": {
            "value": "Cracked"
          },
          "7": {
            "value": "Bent"
          },
          "8": {
            "value": "Distorted"
          },
          "9": {
            "value": "Burnt"
          },
          "10": {
            "value": "Crushed"
          },
          "11": {
            "value": "Other"
          }
        },
        "MS_INC_Related_Risks_112": {
          "2001": {
            "value": "1.1 Line of Fire"
          },
          "2002": {
            "value": "1.2 Pinch Points"
          },
          "2003": {
            "value": "1.3 Eyes on Path"
          },
          "2004": {
            "value": "1.4 Eyes on Task/Hands"
          },
          "2005": {
            "value": "1.5 Ascending/Descending"
          },
          "2006": {
            "value": "2.1 Lifting and Lowering"
          },
          "2007": {
            "value": "2.2 Twisting"
          },
          "2008": {
            "value": "2.3 Pushing/Pulling"
          },
          "2009": {
            "value": "2.4 Overextended/Cramped"
          },
          "2010": {
            "value": "2.5 Repetitive work risks"
          },
          "2011": {
            "value": "2.6 Posture"
          },
          "2012": {
            "value": "2.7 Grip/Force"
          },
          "2013": {
            "value": "2.8 Pressure Points"
          },
          "2014": {
            "value": "2.9 Assistance"
          },
          "2015": {
            "value": "3.1 Selection/Condition"
          },
          "2016": {
            "value": "3.2 Use"
          },
          "2017": {
            "value": "3.3 Storage"
          },
          "2018": {
            "value": "3.4 Vehicle/Selection/Condition/Use"
          },
          "2019": {
            "value": "3.5 Barricades and Warnings"
          },
          "2020": {
            "value": "4.1 Engage / Disengage"
          },
          "2021": {
            "value": "4.2 Confined Space Entry"
          },
          "2022": {
            "value": "4.3 Hot Work"
          },
          "2023": {
            "value": "4.4 Communication of Hazards"
          },
          "2024": {
            "value": "4.5 Pre-Post Job Inspection"
          },
          "2025": {
            "value": "5.1 Head"
          },
          "2026": {
            "value": "5.2 Eyes and Face"
          },
          "2027": {
            "value": "5.3 Hearing"
          },
          "2028": {
            "value": "5.4 Respiratory"
          },
          "2029": {
            "value": "5.5 Hand"
          },
          "2030": {
            "value": "5.6 Body"
          },
          "2031": {
            "value": "5.7 Fall"
          },
          "2032": {
            "value": "5.8 Foot"
          },
          "2033": {
            "value": "6.1 Walking/Working Surfaces"
          },
          "2034": {
            "value": "6.2 Housekeeping"
          },
          "2035": {
            "value": "6.3 Lighting"
          },
          "2036": {
            "value": "6.4 Temperature Extremes"
          },
          "2037": {
            "value": "6.5 Industrial Hygiene"
          },
          "2038": {
            "value": "7.1 Phone Neck"
          },
          "2039": {
            "value": "7.2 Posture: Neck"
          },
          "2040": {
            "value": "7.3 Wrist & arm posture"
          },
          "2041": {
            "value": "7.4 Posture: Back"
          },
          "2042": {
            "value": "7.5 Position: Wrist & arm at the keyboard"
          },
          "2043": {
            "value": "7.6 Position: Wrist and arm while using the mouse"
          },
          "2044": {
            "value": "7.7 Position: Hips, legs and feet"
          },
          "2045": {
            "value": "8.1 Journey Planning"
          },
          "2046": {
            "value": "8.2 Pre-trip Inspection and Seat Belt"
          },
          "2047": {
            "value": "8.3 Driving at Proper Speed"
          },
          "2048": {
            "value": "8.4 Following Distance"
          },
          "2049": {
            "value": "8.5 Braking"
          },
          "2050": {
            "value": "8.6 Changing Lanes"
          },
          "2051": {
            "value": "8.7 Lifting Vision and Scanning"
          },
          "2052": {
            "value": "8.8 Reversing Vehicle"
          },
          "2053": {
            "value": "9.1 Other"
          },
          "2054": {
            "value": "3.6 Office Tools Storage & Condition"
          }
        },
        "MS_INC_Incident_Type_Reporting_113": {
          "1": {
            "value": "Level 1 Investigation - For serious events (SIF actuals, SIF potentials, serious aircraft damage, serious equipment damage and serious property damage) which require detailed root cause analysis and correction actions"
          },
          "2": {
            "value": "Level 2 Investigation - For moderate events (recordable injuries, moderate and minor aircraft damage, moderate equipment damage and serious property damage) which require basic root cause analysis and correction actions"
          },
          "3": {
            "value": "Level 3 Investigation - For minor (first aid injuries, minor equipment damage and minor property damage) which require basic investigation and follow-up."
          }
        },
        "MS_INC_Plant_Equipment_Category_114": {
          "1": {
            "value": "Handheld non-powered tools"
          },
          "2": {
            "value": "Handheld power tools  "
          },
          "3": {
            "value": "Stationary industrial equipment"
          },
          "4": {
            "value": "Stationary catering equipment"
          },
          "5": {
            "value": "Non-powered mobile catering equipment"
          },
          "6": {
            "value": "Powered mobile catering equipment"
          },
          "7": {
            "value": "Powered people movement"
          },
          "8": {
            "value": "Portable people movement"
          },
          "9": {
            "value": "Mobile powered people movement"
          },
          "10": {
            "value": "Portable non-powered lifting devices"
          },
          "11": {
            "value": "Mobile powered lifting devices "
          },
          "12": {
            "value": "Stationary lifting equipment"
          },
          "13": {
            "value": "Stationary office equipment"
          },
          "14": {
            "value": "Portable office equipment"
          },
          "15": {
            "value": "Welders"
          }
        },
        "MS_INC_Incident_Type_Reporting_116": {
          "1": {
            "value": "Detached"
          },
          "2": {
            "value": "Broken"
          },
          "3": {
            "value": "Dented"
          },
          "4": {
            "value": "Scratched"
          },
          "5": {
            "value": "Punctured or deflated"
          },
          "6": {
            "value": "Cracked"
          },
          "7": {
            "value": "Bent"
          },
          "8": {
            "value": "Distorted"
          },
          "9": {
            "value": "Burnt"
          },
          "10": {
            "value": "Crushed"
          },
          "11": {
            "value": "Other"
          }
        },
        "MS_INC_Incident_Type_Reporting_120": {
          "1": {
            "value": "Employee"
          },
          "2": {
            "value": "Third party"
          },
          "3": {
            "value": "Customer"
          },
          "4": {
            "value": "Don't know"
          }
        },
        "MS_INC_Incident_Type_Reporting_165": {
          "1": {
            "value": "Workplace injury"
          },
          "2": {
            "value": "Aircraft damage"
          },
          "3": {
            "value": "Weight and balance"
          },
          "4": {
            "value": "Security breach"
          },
          "5": {
            "value": "Dangerous goods"
          },
          "6": {
            "value": "GSE damage"
          },
          "7": {
            "value": "Property damage"
          },
          "10": {
            "value": "Plant and equipment damage"
          }
        },
        "MS_INC_Incident_Type_Reporting_181": {
          "1": {
            "value": "Yes"
          },
          "2": {
            "value": "No"
          }
        },
        "MS_INC_Incident_Type_Reporting_183": {
          "1": {
            "value": "Yes"
          },
          "2": {
            "value": "No"
          }
        },
        "ms_inc_actual_injury_properties": {
          "Total_Questions_Procedures": {
            "value": "Total Questions/Procedures"
          },
          "Add_One_or_More_Area_Of_Compliance": {
            "value": "Add One or More Area Of Compliance"
          },
          "vempforaircraft": {
            "value": "Employee lookup for aircraft damage"
          },
          "Modify_Review_Approve": {
            "value": "Modify/Review/Approve"
          },
          "Total_Items1": {
            "value": "Total Items"
          },
          "Delete_Last_Question_Procedure1": {
            "value": "Delete Last Question/Procedure"
          },
          "NotValidPlan": {
            "value": "The Plan does not contain the 'Performed On' and 'Performed By' information required to send assignment(s)."
          },
          "the_Fallowing": {
            "value": "The following field(s) require inputs:"
          },
          "aSaveDraft": {
            "value": "Save Draft"
          },
          "Total_Organizations": {
            "value": "Total Organizations"
          },
          "CommentsHistory": {
            "value": "Comments History"
          },
          "The_Item_Name_check1": {
            "value": "has already been defined.  Please select a different Item."
          },
          "General": {
            "value": "General"
          },
          "vemplkpwpinjury": {
            "value": "Employee lookup for workplace injury"
          },
          "submittext": {
            "value": "Submits for processing it to the next step"
          },
          "Add_One_Or_More_Requirements": {
            "value": "Add One Or More Requirements"
          },
          "Common_Pre_Test_Questions": {
            "value": "Common Pre-Test Questions"
          },
          "viewreports": {
            "value": "View Reports"
          },
          "Add_Organization": {
            "value": "Add Organization"
          },
          "History": {
            "value": "History"
          },
          "chg_history": {
            "value": "Change History Report"
          },
          "canfr": {
            "value": "Cancel Form"
          },
          "Assign_To": {
            "value": "Assign To"
          },
          "savedraftclosetext": {
            "value": "Saves the content and closes the form without processing it to the next step"
          },
          "ccancel": {
            "value": "Click to Cancel Form"
          },
          "Additional_Details": {
            "value": "Additional Details"
          },
          "savdr": {
            "value": "Save Draft Form And Close"
          },
          "Ownership_and_Security": {
            "value": "Ownership and Security"
          },
          "vflightlookup": {
            "value": "Flight lookup"
          },
          "Add_one_more_items_alert_messge": {
            "value": "Existing item(s) in this tab will be replaced with your selection. Click OK to continue."
          },
          "Add_One_or_More_Core_Objects": {
            "value": "Add One or More Core Objects"
          },
          "The_Item_Name_check": {
            "value": "The Item Name  "
          },
          "Under_Modification": {
            "value": "Under Modification"
          },
          "ObjectTypeChange": {
            "value": "On changing Test/Survey Performed On, information on Performed On tab will be lost."
          },
          "Documents": {
            "value": "Documents"
          },
          "savetext": {
            "value": "Saves the content without processing it to the next step"
          },
          "viewreportstext": {
            "value": "View/Run the reports that are associated with this form"
          },
          "Add_One_Or_More_Objectives": {
            "value": "Add One Or More Objectives"
          },
          "Add_Item": {
            "value": "Add Item"
          },
          "Add_One_Or_More_Standards": {
            "value": "Add One Or More Standards"
          },
          "Scheduling": {
            "value": "Scheduling"
          },
          "WIT_MULTIROW_NUMBER_OF_ROWS_PER_PAGE": {
            "value": "1"
          },
          "vemplookpwitness": {
            "value": "Employee lookup for witness"
          },
          "tasavedra": {
            "value": "Save Draft Form"
          },
          "Organizations_to_be_Tested_Surveyed_Certified": {
            "value": "Organizations to be Tested/Surveyed/Certified"
          },
          "submittitle": {
            "value": "Submit"
          },
          "Total_Questions_Procedures1": {
            "value": "Total Questions/Procedures"
          },
          "Value_for_Due_By_from": {
            "value": "Value for Due By from Start (Calendar Days) should be in the range of '1 to 365'"
          },
          "the_Fallowing_objects": {
            "value": "The following objects already exists :"
          },
          "Common_Questions_Procedures": {
            "value": "Common Questions/Procedures"
          },
          "Delete4": {
            "value": "Delete"
          },
          "Delete_Last_Item": {
            "value": "Delete Last Item"
          },
          "Click_here_to_Add": {
            "value": "Click here to Add"
          },
          "Delete3": {
            "value": "Delete"
          },
          "Delete2": {
            "value": "Delete"
          },
          "Delete1": {
            "value": "Delete"
          },
          "DGR_MULTIROW_NUMBER_OF_ROWS_PER_PAGE": {
            "value": "1"
          },
          "canceltext": {
            "value": "Cancel the changes made to this form"
          },
          "Validity": {
            "value": "Validity (Dates)"
          },
          "savedraft": {
            "value": "Save Draft"
          },
          "select_questions_type": {
            "value": "Select Questions Type"
          },
          "Add_Question_Procedure1": {
            "value": "Add Question/Procedure"
          },
          "Performed_On": {
            "value": "Performed On"
          },
          "Add_One_or_More_Controls": {
            "value": "Add One or More Controls"
          },
          "savedraftclose": {
            "value": "Save Draft &amp; Close"
          },
          "PSD_MULTIROW_NUMBER_OF_ROWS_PER_PAGE": {
            "value": "1"
          },
          "Performed_By": {
            "value": "Performed By"
          },
          "tSaveDraftClose": {
            "value": "Save Draft Form And Close"
          },
          "Details": {
            "value": "Details"
          },
          "Reporting_Period": {
            "value": "Reporting Period"
          },
          "Add_Question_Procedure": {
            "value": "Add Question/Procedure"
          },
          "Delete_Last_Question_Procedure": {
            "value": "Delete Last Question/Procedure"
          },
          "Settings": {
            "value": "Settings"
          },
          "Delete_Last_Organization": {
            "value": "Delete Last Organization"
          },
          "savecl": {
            "value": "SaveDraftClose"
          },
          "cancel": {
            "value": "Cancel"
          },
          "CMQ": {
            "value": "Common Questions/Procedures"
          },
          "Add_One_or_More_Items": {
            "value": "Add One or More Items"
          },
          "FLY_MULTIROW_NUMBER_OF_ROWS_PER_PAGE": {
            "value": "1"
          },
          "vreport": {
            "value": "View Reports"
          }
        }
      },
      "reports": [
        {
          "report": {
            "id": "R-100235",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100235,
                "metricName": "MS_INC_INV_ACTION_LIST_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "incidentId": {
                    "label": "Incidentid",
                    "required": "no",
                    "ref": "ACTUAL_INJURY_ID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "incidentId"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100229",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100229,
                "metricName": "MS_INC_PRELIM_RPT_VER_HIST",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "incident_reference_number": {
                    "label": "Incident_Reference_Number",
                    "required": "no",
                    "ref": "ACTUAL_INJURY_ID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "incident_reference_number"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100230",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100230,
                "metricName": "MS_INC_FINAL_RPT_VER_HIST",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "incident_reference_number": {
                    "label": "Incident_Reference_Number",
                    "required": "no",
                    "ref": "ACTUAL_INJURY_ID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "incident_reference_number"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100241",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100241,
                "metricName": "MS_INC_PRELIM_RPT_PBL_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "inc_ref_number": {
                    "label": "Inc_Ref_Number",
                    "required": "no",
                    "ref": "ACTUAL_INJURY_ID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "inc_ref_number"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100239",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100239,
                "metricName": "MS_INC_FINAL_RPT_ACK_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "inc_ref_number": {
                    "label": "Inc_Ref_Number",
                    "required": "no",
                    "ref": "ACTUAL_INJURY_ID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "inc_ref_number"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100234",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100234,
                "metricName": "MS_INC_COR_ACTION_LIST_INLINE_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "incidentId": {
                    "label": "Incidentid",
                    "required": "no",
                    "ref": "ACTUAL_INJURY_ID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "incidentId"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100242",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100242,
                "metricName": "MS_INC_Actual_Comm_Hist_Rpt",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "act_in_id": {
                    "label": "act_in_id",
                    "required": "no",
                    "ref": "FORM_PID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "act_in_id"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100233",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100233,
                "metricName": "MS_INC_HRMS_LOOKUP_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "LOGIN_ID": {
                    "label": "Login_Id",
                    "required": "no",
                    "ref": "COUNTRY"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "LOGIN_ID",
                      "value": "ZRH"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100236",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100236,
                "metricName": "MS_INC_INJRY_HRMS_LKP_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "LOGIN_ID": {
                    "label": "Login_Id",
                    "required": "no",
                    "ref": "COUNTRY"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "LOGIN_ID",
                      "value": "ZRH"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100237",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100237,
                "metricName": "MS_INC_AIRDMG_HRMS_LKP_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "LOGIN_ID": {
                    "label": "Login_Id",
                    "required": "no",
                    "ref": "COUNTRY"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "LOGIN_ID",
                      "value": "ZRH"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100238",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100238,
                "metricName": "MS_INC_LINK_INCIDENT_RPT",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "country": {
                    "label": "Country",
                    "required": "no",
                    "ref": "COUNTRY"
                  },
                  "INC_LOCATION": {
                    "label": "Inc_Location",
                    "required": "no",
                    "ref": "INC_LOCATION"
                  },
                  "INC_SUB_LOCATION": {
                    "label": "Inc_Sub_Location",
                    "required": "no",
                    "ref": "INC_SUB_LOCATION"
                  },
                  "incident_date": {
                    "label": "Incident_Date",
                    "required": "no",
                    "ref": "INCIDENT_DATE"
                  },
                  "actual_injury_id": {
                    "label": "Actual_Injury_Id",
                    "required": "no",
                    "ref": "ACTUAL_INJURY_ID"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "country",
                      "value": "ZRH"
                    },
                    {
                      "id": "INC_LOCATION"
                    },
                    {
                      "id": "INC_SUB_LOCATION"
                    },
                    {
                      "id": "incident_date"
                    },
                    {
                      "id": "actual_injury_id"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "report": {
            "id": "R-100243",
            "mode": "linkedReport",
            "form": {
              "meta": {
                "iid": 0,
                "mid": 100243,
                "metricName": "MS_INC_Incident_Flight_Lookup_Rpt",
                "pid": 0
              },
              "structure": {
                "nonmultirow": {
                  "reported_by": {
                    "label": "Reported_By",
                    "required": "no",
                    "ref": "REPORTED_BY"
                  },
                  "incident_date": {
                    "label": "Incident_Date",
                    "required": "no",
                    "ref": "INCIDENT_DATE"
                  },
                  "flight_number": {
                    "label": "Flight_Number",
                    "required": "no",
                    "ref": "FLIGHT_NUMBER"
                  }
                }
              },
              "content": {
                "nonmultirow": {
                  "field": [
                    {
                      "id": "reported_by"
                    },
                    {
                      "id": "incident_date"
                    },
                    {
                      "id": "flight_number"
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    };

  var isObject = function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
  };

  var typeDefHelper = function(value) {
    var type = "undefined";
    if(Array.isArray(value)){
      type = "array";
    } else if (typeof value === 'string') {
      type = "string";
    } else if (Number.isInteger(value)) {
      type = "number";
    } else if(isObject(value)){
      type = "object";
    }
    return type;
  };

  var getValueFromObject = function(jsonobject){
      return jsonobject.value;
  };

  var prepareRow = function(key, value, parentid,arrayindex,taskid,metricname){
    if(typeDefHelper(value) === "object"){
      constructRow(key,value,"string",parentid, taskid,metricname,arrayindex);
    }else if(typeDefHelper(value) === "array"){
      if(!value.length){
          constructRow(key,"","array",parentid, taskid,metricname,arrayindex);
      }
   }else if(value === "undefined"){
     constructRow(key,"undefined","multirow",parentid, taskid,metricname,arrayindex);
   }

 };

 var constructRow = function(id, value, datatype, parentid, taskid, metricname, arrayindex){
    var eachrow = {};
    eachrow["id"] = id;
    if(datatype === "string"){
      eachrow["value"] = getValueFromObject(value);
    }else if(datatype === "array"){
      eachrow["value"] = value.toString();
    }else if(datatype === "multirow"){
      eachrow["value"] = "undefined";
    }
    eachrow["datatype"] = datatype;
    eachrow["parentid"] = parentid;
    eachrow["tid"] = taskid;
    eachrow["metricname"] = metricname;
    eachrow["arrayindex"] = arrayindex;
    rowsToInsert.push(eachrow);
  };

  //Construct Json object
  var contentJsonObject = {};


  var isEmpty = function isArrayEmpty(array) {
    return array.filter(function(el) {
        return !jQuery.isEmptyObject(el);
    }).length === 0;
  }

  var getObjectFromValue = function(value){
    var returnvalue = {};
    returnvalue[VALUE] = value;
    return returnvalue;
  }

  const DATATYPE = "datatype";
  const ARRAYINDEX = "arrayindex";
  const ID = "id";
  const VALUE = "value";
  const PARENTID = "parentid";


  var constructJson = function(jsonArray){
    for(var i=0;i<jsonArray.length;i++){
      var eachObject = jsonArray[i];
      if((eachObject[DATATYPE] === "string") && (eachObject[ARRAYINDEX] === "undefined")){
        contentJsonObject[eachObject[ID]] = getObjectFromValue(eachObject[VALUE]);
      }else if(eachObject[DATATYPE] === "multirow"){
            contentJsonObject[eachObject[ID]] = [];
            var arraylength = parseInt(eachObject[ARRAYINDEX]);
            var emptyArray = contentJsonObject[eachObject[ID]];
            for(var index=0;index<arraylength;index++){
              emptyArray.push({});
            }
            contentJsonObject[eachObject[ID]] = emptyArray;
      }else if((eachObject[DATATYPE] === "array") && (eachObject[ARRAYINDEX] === "undefined")){
        var res = eachObject[VALUE].split(",");
        contentJsonObject[eachObject[ID]] = res;
      }else if((eachObject[DATATYPE] === "array") && (eachObject[ARRAYINDEX] !== "undefined")){
        var array = contentJsonObject[eachObject[PARENTID]];
        var indextoget = parseInt(eachObject[ARRAYINDEX]);
        var objectotuse = array[indextoget];
        var res = eachObject[VALUE].split(",");
        objectotuse[eachObject[ID]] = res;
      }else if((eachObject[DATATYPE] === "string") && (eachObject[ARRAYINDEX] !== "undefined") ){
          //By using its parent id and arrayindex we should retireve the array and its object like
          var array = contentJsonObject[eachObject[PARENTID]];
          var indextoget = parseInt(eachObject[ARRAYINDEX]);
          var objectotuse = array[indextoget];
          objectotuse[eachObject[ID]] = getObjectFromValue(eachObject[VALUE]);
      }
    }
  };

  var JsonParser = {
    //Method to Parse the Json Object
    parseContent: function(jsonObject, tableName, taskid, metricname){
       //if(jsonObject != "")
       //{
         $.each(jsonobject.content, function(key, value) {
            if(typeDefHelper(value) === "array" && value.length){
              var parentid = key;
              for(var index=0;index<value.length;index++){
                  if(index === 0){
                    var arraylength = value.length;
                    prepareRow(key, "undefined", "content", arraylength.toString(),taskid,metricname)
                  }
                  $.each(value[index], function(key1, value1){
                    prepareRow(key1, value1, parentid, index,taskid,metricname)
                  });
              }
            }else{
              prepareRow(key, value, "content","undefined",taskid,metricname)
            }
          });
       //}
       db.insertData(tableName,rowsToInsert);
    },
    getContentJson: function(tableName,tid, mname,sucessResult){
      var params = [{
          "metricname" : mname,
          "tid" : tid
        }];
        var jsonArray = [];
        db.getDataFromTable (tableName, params, function (response) {
              if (response) {
                for(var res = 0; res < response.length; res++){
                  jsonArray.push(response.item(res));
                }
              }
              constructJson(jsonArray)
              sucessResult(contentJsonObject);
        });
    },
    updateContent: function(tableName, params){
      var params = [{
         "id":"INJURED_PERSON_NAME",
         "value":"ayyanababu",
         "tid":"T-123-234-567",
         "metricname":"InjuryForm",
         "parentid":"PSD",
         "arrayindex":"0",
       }];

       var whereparams = [{
         "id":params[0]["id"],
         "parentid":params[0]["parentid"]
       }];


        db.updateTable(tableName,params,whereparams);
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
    //  for(var i=0;i<params.length;i++){
        //var datatoinsert = getDatatoInsert(params[i]);
        db.insertData(tablename,params);
    //  }
    }
  };
  return JsonParser;
});
