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
      emitChange: function() {
        this.emit(constants.CHANGE_EVENT);
      },
      addChangeListener: function(callback) {
        this.on(constants.CHANGE_EVENT, callback);
      },
      removeChangeListener: function(callback) {
        this.removeListener(constants.CHANGE_EVENT, callback);
      }
    });

    appDispatcher.register (function (action) {
        switch (action.actionType) {
            case constants.Navigation_PUSH:
                {
                    controllerStack.push(action.controller);
                    navigationStore.emitChange();
                    break;
                }
            case constants.Navigation_POP:
                {
                    controllerStack.pop();
                    navigationStore.emitChange();
                    break;
                }
            case constants.Navigation_Clear:
                {
                    controllerStack =[];
                    navigationStore.emitChange();
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
