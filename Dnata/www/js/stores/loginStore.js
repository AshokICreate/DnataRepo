define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/loginConstants");
    var serverCall = require ("util/serverCall");

    var userDetails;
    var errorMsg;
    var sessionExpiryTimer;
    var promptExpiryTimer;

    var LoginStore = assign ({}, EventEmitter.prototype, {

      isUserLoggedIn:function()
      {
          if(userDetails)
            return true;
          else {
            return false;
          }
      },
      getError:function()
      {
          return errorMsg;
      },
      emitChange: function(id) {
        this.emit(id);
      },
      addChangeListener: function(id,callback) {
        this.on(id, callback);
      },
      removeChangeListener: function(id,callback) {
        this.removeListener(id, callback);
      }
    });

    function showPrompt()
    {
      LoginStore.emitChange(constants.Pre_Session_Expiry_Event);
    }

    function clearSessionTimers()
    {
        if(sessionExpiryTimer)
        {
            clearTimeout(sessionExpiryTimer);
            sessionExpiryTimer = undefined;
        }
        if(promptExpiryTimer)
        {
            clearTimeout(promptExpiryTimer);
            promptExpiryTimer = undefined;
        }

    }
    function setSessionExpiryTimers(time)
    {
        clearSessionTimers();
        sessionExpiryTimer = setTimeout(logout, time);
        var promptExpiryTime = 1*60*1000
        if(time > promptExpiryTime)
        {
            promptExpiryTimer = setTimeout(showPrompt, (time-promptExpiryTime));
        }
    }

    function login(user){
      var gotLoginData = function(data,error)
      {
          if(!error)
          {
            userDetails = data;
            setSessionExpiryTimers(parseInt(data.expires_in));
          }else {
            errorMsg = error;
          }
          LoginStore.emitChange(constants.Login_Issued_Event);
      }
      serverCall.connectServer("GET","handshake",user,gotLoginData);
    }

    function reLogin(issueCode)
    {
        var reloggedData = function(data,error)
        {
            if(!error)
            {
              userDetails = data;
              setSessionExpiryTimers(parseInt(data.expires_in));
            }else {
              showPrompt();
            }
        }

        if(userDetails)
        {
            var Obj = {
               username: userDetails.user_name,
               pwd: issueCode,
            }
            serverCall.connectServer("GET","handshake",Obj,reloggedData);
        }

    }
    
    function logout(){
      userDetails = undefined;
      clearSessionTimers();
      serverCall.clearCookies()
      LoginStore.emitChange(constants.Logout_Issued_Event);
    }

    appDispatcher.register (function (action) {
        switch (action.actionType) {
            case constants.Login_Authenticate:
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
            case constants.Login_Reissue:
            {
                reLogin(action.token);
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
