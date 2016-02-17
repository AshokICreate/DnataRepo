define(function (require) {
  var ActionBar= require('views/actionbar');
  var NavigationController = require ("controllers/navigationController");
  var store = require('stores/homeStore');
  var Grid = require ("controllers/gridController");

  var home = React.createClass({
      displayName: 'home',
      homeMenuItems:store.getHomeMenuItems(),
      getInitialState:function()
      {
        var data = this.homeMenuItems;
        return {item:data[0]};
      },
      _onMenuItemClick:function(key)
      {
        var data = this.homeMenuItems;
        this.setState({item:data[key]});
      },
      render: function() {
        var content = <Grid items={store.getInjuryFormItems()}/>;
        var controllerData = {
          title:this.state.item,
          content:content
        }

        var data = this.homeMenuItems;
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
