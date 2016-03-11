define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/navigationConstants");

    var controllerStack =[];

    var navigationStore = assign ({}, EventEmitter.prototype, {

      getController:function()
      {
        var controller;
        if(controllerStack.length>0)
        {
          controller = controllerStack[controllerStack.length-1];
        }

        return controller;
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
                    controllerStack.push(action.controller);
                    navigationStore.emitChange(constants.Change_Event);
                    break;
                }
            case constants.Navigation_POP:
                {
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
            default:
                {
                    console.log ("No Registered action");
                }
        }
    });

    return navigationStore;
  });
