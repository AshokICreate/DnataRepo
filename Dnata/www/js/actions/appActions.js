define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var constants = require ("constants/appConstants");
    var AppActions = {
        createHome: function () {
          appDispatcher.dispatch ({
            actionType: constants.Home_Screen
          });
        }
    };
    return AppActions;
});
