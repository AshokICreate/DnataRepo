define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/appConstants");

    var AppStore = assign ({}, EventEmitter.prototype, {
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
          case constants.ReInitiate:
          {
              isLoggedin = false; /*crude fix*/
              AppStore.emitChange();
              break;
          }
          default:
          {
              return true;
          }
        }
    });

    return AppStore;
  });
