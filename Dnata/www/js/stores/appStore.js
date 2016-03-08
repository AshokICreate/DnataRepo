define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/appConstants");

    var isLoggedin = false;

    var AppStore = assign ({}, EventEmitter.prototype, {

      showScreen:function()
      {
        return isLoggedin;
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
          case constants.Home_Screen:
              {
                  isLoggedin = true;
                  FormStore.emitChange();
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
