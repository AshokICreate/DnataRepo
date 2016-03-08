define(function (require) {
  var ActionBar= require('views/actionbar');
  var NavigationController = require ("controllers/navigationController");
  var store = require('stores/homeStore');
  var Grid = require ("controllers/gridController");
  var Form = require ("controllers/form");

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
      getContent:function(item)
      {
          switch (item)
          {
              case "MS_INC_ACTUAL_INJURY":
              {
                  return React.createElement(Grid, {items: store.getInjuryFormItems()});
              }
              default:
              {
                  return React.createElement(Form, {id: item});
              }
          }
      },
      render: function() {
        var content = this.getContent(this.state.item);
        var controllerData = {
          title:this.state.item,
          content:content
        };

        var data = this.homeMenuItems;
        var actionBarData = {
           items:data,
           onMenuItemClick:this._onMenuItemClick
        };
        return (
            React.createElement("div", {className: "gclass"}, 
              React.createElement(ActionBar, {data: actionBarData}), 
              React.createElement(NavigationController, {controller: controllerData})
            )
        );
      }
  });
  return home;

});
