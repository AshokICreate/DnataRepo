define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var constants = require ("constants/navigationConstants");
    var navigationActions = {
        pushController: function (controller) {
            appDispatcher.dispatch ({
                actionType: constants.Navigation_PUSH,
                controller: controller
            });
        },
        popController: function () {
            appDispatcher.dispatch ({
                actionType: constants.Navigation_POP,
            });
        },
        clearControllers:function(){
            appDispatcher.dispatch ({
                actionType: constants.Navigation_Clear,
            });
        }
    };
    return navigationActions;
});
