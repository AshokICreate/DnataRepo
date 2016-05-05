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
        this.emit(constants.Change_Event);
      },
      addChangeListener: function(callback) {
        this.on(constants.Change_Event, callback);
      },
      removeChangeListener: function(callback) {
        this.removeListener(constants.Change_Event, callback);
      }
    });
    function login(user){
      var gotLoginData = function(data,error)
      {
        if(!error && data.authenticated === "yes")
        {
          isLoggedin = true;

        }
        LoginStore.emitChange();
      }
      serverCall.connectServer("GET","handshake",user,gotLoginData);
    }

    function logout(){

      isLoggedin  = false;
      //setTimeout(function(){ LoginStore.emitChange(); }, );
      LoginStore.emitChange();
    }
    appDispatcher.register (function (action) {
        switch (action.actionType) {
            case constants.Login_Auth:
                {
                  //authentication
                  login(action.user);
                  break;
                }
            case constants.Logout:
                {

                  logout();
                  break;
                }
            default:
                {
                    console.log ("No Registered action");
                }
        }
    });

    return LoginStore;
  });
