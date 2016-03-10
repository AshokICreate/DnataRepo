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
                actionType: constants.Navigation_POP
            });
        },
        changeRootController:function(controller)
        {
            appDispatcher.dispatch ({
                actionType: constants.Navigation_ChangeRoot,
                controller: controller
            });
        },
        clearControllers:function(){
            appDispatcher.dispatch ({
                actionType: constants.Navigation_Clear
            });
        }
    };
    return navigationActions;
});
