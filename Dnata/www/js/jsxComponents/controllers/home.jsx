define(function (require) {
  var ActionBar= require('views/actionbar');
  var NavigationController = require ("controllers/navigationController");
  var data = ["actual_injury","potential_injury","feedback","observation","safety_contact","settings"];
  var injuryForms = ["workplace_injury","aircraft_damage","weight_and_balance",
                  "security_breach","dangerous_goods","gse_damage","property_damage",
                  "plant_and_equipment_damage"];
  var Form = require ("controllers/form");
  var Grid = require ("controllers/gridController");

  var home = React.createClass({
      displayName: 'home',
      getInitialState:function()
      {
        return {item:data[0]};
      },
      _onMenuItemClick:function(key)
      {
        this.setState({item:data[key]});
      },
      render: function() {
        var content = <Grid items={injuryForms}/>;
        var controllerData = {
          title:this.state.item,
          content:content
        }

        var actionbarData = {
           items:data,
           onMenuItemClick:this._onMenuItemClick
        }
        return (
            <div className="gclass">
              <ActionBar data={actionbarData} />
              <NavigationController controller={controllerData} />
            </div>
        );
      }
  });
  return home;

});
