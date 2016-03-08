define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var constants = require ("constants/loginConstants");
    var loginActions = {
        createLogin: function (text) {
          appDispatcher.dispatch ({
            actionType: constants.Login_Auth,
            text: text
          });
        }
    };
    return loginActions;
});
