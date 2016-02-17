define (function (require) {
  var assign = require ("object-assign");
  var EventEmitter = require ("event-emitter").EventEmitter;
  
  var homeMenuItems = ["actual_injury","potential_injury","feedback","observation","safety_contact","settings"];
  var injuryFormItems = ["workplace_injury","aircraft_damage","weight_and_balance",
                  "security_breach","dangerous_goods","gse_damage","property_damage",
                  "plant_and_equipment_damage"];

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
