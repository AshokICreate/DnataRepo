define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var constants = require ("constants/appConstants");
    var AppActions = {
        reInitiateApp: function () {
            appDispatcher.dispatch ({
                actionType: constants.ReInitiate
            });
        }
    };
    return AppActions;
});
