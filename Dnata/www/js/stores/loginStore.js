define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/loginConstants");

    var entered =[];

    var LoginStore = assign ({}, EventEmitter.prototype, {

      getEntered:function()
      {
        return entered;
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
            case constants.Login_Auth:
                {
                  //authentication

                  LoginStore.emitChange();

                }
            default:
                {
                    console.log ("No Registered action");
                }
        }
    });

    return LoginStore;
  });
