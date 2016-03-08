define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var constants = require ("constants/formConstants");
    var formActions = {
        createText: function (text) {
            appDispatcher.dispatch ({
                actionType: constants.Form_CreateText,
                text: text
            });
        },
        clear: function () {
            appDispatcher.dispatch ({
                actionType: constants.Form_Clear,
            });
        },
        createLogin: function (text) {
          appDispatcher.dispatch ({
            actionType: constants.Form_CreateLogin,
            text: text
          });
        }
    };
    return formActions;
});
