define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/loginConstants");
    var serverCall = require ("util/serverCall");

    var isLoggedin = false;
    var LoginStore = assign ({}, EventEmitter.prototype, {

      isUserLoggedIn:function()
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
    function login(){
      var gotLoginData = function(data)
      {
        console.log(data);
        if(data.authenticated === "yes")
          isLoggedin = true;
        LoginStore.emitChange();
      }
      serverCall.connectServer("GET","handshake","",gotLoginData);
    }

    appDispatcher.register (function (action) {
        switch (action.actionType) {
            case constants.Login_Auth:
                {
                  //authentication
                  login();

                }
            default:
                {
                    console.log ("No Registered action");
                }
        }
    });

    return LoginStore;
  });
