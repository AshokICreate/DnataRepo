define (function (require) {
    var appDispatcher = require ("util/appDispatcher");
    var EventEmitter = require ("event-emitter").EventEmitter;
    var assign = require ("object-assign");
    var constants = require ("constants/formConstants");

    var entered =[];

    var FormStore = assign ({}, EventEmitter.prototype, {

      getEntered:function()
      {
        return entered;
      },
      emitChange: function() {
        this.emit(constants.CHANGE_EVENT);
      },
      addChangeListener: function(callback) {
        this.on(constants.CHANGE_EVENT, callback);
      },
      removeChangeListener: function(callback) {
        this.removeListener(constants.CHANGE_EVENT, callback);
      }
    });

    appDispatcher.register (function (action) {
        switch (action.actionType) {
            case constants.Form_Clear:
                {
                    entered.length=0;
                    FormStore.emitChange();
                    break;
                }
            case constants.Form_CreateText:
                {
                    entered.push(action.text);
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
  });
