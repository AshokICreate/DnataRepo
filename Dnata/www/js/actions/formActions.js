define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var constants = require ("constants/formConstants");
    var formActions = {

      getFormData: function (id) {
          appDispatcher.dispatch ({
              actionType: constants.Form_Data,
              formId: id
          });
      }
    };
    return formActions;
});
