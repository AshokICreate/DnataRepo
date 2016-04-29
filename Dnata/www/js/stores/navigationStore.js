define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/navigationConstants");

    var controllerStack =[];
    var controllerState = {};
    var popUpView;

    var navigationStore = assign ({}, EventEmitter.prototype, {

      getPresentationLayer:function()
      {
        return popUpView;
      },
      getController:function()
      {
        var controller;
        if(controllerStack.length>0)
        {
          controller = controllerStack[controllerStack.length-1];
        }

        return controller;
      },
      getControllerState:function()
      {
          var state;

          if(controllerStack.length>0)
          {
              state =  controllerState[controllerStack.length-1];
          }

          return state;
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
            case constants.Navigation_PUSH:
                {
                    var currentIndex = controllerStack.length-1;
                    if(action.state)
                    {
                        controllerState[currentIndex] = action.state;
                    }

                    controllerStack.push(action.controller);
                    navigationStore.emitChange(constants.Change_Event);
                    break;
                }
            case constants.Navigation_POP:
                {
                    var currentIndex = controllerStack.length-1;

                    if(controllerState[currentIndex])
                    {
                        delete controllerState[currentIndex];
                    }

                    controllerStack.pop();
                    navigationStore.emitChange(constants.Change_Event);
                    break;
                }
            case constants.Navigation_Clear:
                {
                    controllerStack =[];
                    navigationStore.emitChange(constants.Change_Event);
                    break;
                }
            case constants.Navigation_ChangeRoot:
              {
                    controllerStack =[];
                    controllerStack.push(action.controller);
                    navigationStore.emitChange(constants.Change_Event);
                    break;
              }
            case constants.Navigation_PresentPopup:
              {
                    popUpView = action.presentationLayer
                    navigationStore.emitChange(constants.Change_Event);
                    break;
              }
            case constants.Navigation_RemovePopup:
              {
                    popUpView = undefined;
                    navigationStore.emitChange(constants.Change_Event);
                    break;
              }
            default:
                {
                    console.log ("No Registered action");
                }
        }
    });

    return navigationStore;
  });
