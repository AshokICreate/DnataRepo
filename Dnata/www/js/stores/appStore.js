define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/appConstants");

    var isLoggedin = true;

    var AppStore = assign ({}, EventEmitter.prototype, {

      showScreen:function()
      {
        return isLoggedin;
      },
      emitChange: function() {
        this.emit(constants.Change_Event);
      },
      addChangeListener: function(callback) {
        this.on(constants.Change_Event, callback);
      },
      removeChangeListener: function(callback) {
        this.removeListener(constants.Change_Event, callback);
      }
    });

    appDispatcher.register (function (action) {
        switch (action.actionType) {
          case constants.Home_Screen:
              {
                  isLoggedin = true;
                  AppStore.emitChange();
                  break;
              }

          default:
              {
                  console.log ("No Registered action");
              }
        }
    });

    return AppStore;
  });
