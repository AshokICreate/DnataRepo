define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/formConstants");
    var serverCall = require ("util/serverCall");

    var FormStore = assign ({}, EventEmitter.prototype, {
      data:{

      },
      emitChange: function() {
        this.emit(constants.CHANGE_DATA_EVENT);
      },
      addChangeListener: function(callback) {
        this.on(constants.CHANGE_DATA_EVENT, callback);
      },
      removeChangeListener: function(callback) {
        this.removeListener(constants.CHANGE_DATA_EVENT, callback);
      }
    });

    appDispatcher.register (function (action) {
      switch (action.actionType) {
        case constants.Form_Data:
        {
          getFormData(action.formId);
          FormStore.emitChange();
          break;
        }
        default:
        {
          console.log ("No Registered action");
        }
      }
    });

    return FormStore;

    function getFormData(id)
    {

      var gotTasks = function(data)
      {
          console.log(data);
      }
      serverCall.connectServer("GET","tasks","",gotTasks)
    }
  });
