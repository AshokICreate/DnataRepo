define (function (require) {
  var appDispatcher = require ("util/appDispatcher");
  var EventEmitter = require ("event-emitter").EventEmitter;
  var assign = require ("object-assign");

  var homeMenuItems = ["MS_INC_ACTUAL_INJURY","MS_INC_POTENTIAL_INJ_FORM","feedback","observation","safety_contact","settings"];
  var injuryFormItems = ["PSD","FLY","WAB", "SBR","DGR","EQD","PRD", "PAE"];

  var store = assign ({}, EventEmitter.prototype, {

    getHomeMenuItems:function()
    {
      return homeMenuItems;
    },
    getInjuryFormItems:function()
    {
      return injuryFormItems;
    }

  });

  return store;

});
