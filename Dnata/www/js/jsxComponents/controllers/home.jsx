define(function (require) {
  var ActionBar= require('views/actionbar');
  var NavigationController = require ("controllers/navigationController");
  var Store = require('stores/homeStore');
  var Grid = require ("controllers/gridController");
  var Form = require ("controllers/form");

  var home = React.createClass({
      displayName: 'home',
      homeMenuItems:Store.getHomeMenuItems(),
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

          var content;
          var rightButtonName;
          var leftButtonName;
          switch (item)
          {
              case "MS_INC_ACTUAL_INJURY":
              {
                  content = <Grid items={Store.getPotentialInjuryFormItems()} id={item} />;
                  break;
              }
              default:
              {
                  content =  <Form id={item} />;
                  rightButtonName = "Submit";
                  leftButtonName = "Back";
              }
          }

          var controllerData = {
            title:this.state.item,
            content:content,
            rightButtonName:rightButtonName,
            leftButtonName:leftButtonName
          };

          return controllerData;
      },
      render: function() {
        var controllerData = this.getContent(this.state.item);

        var data = this.homeMenuItems;
        var actionBarData = {
           items:data,
           onMenuItemClick:this._onMenuItemClick
        };
        return (
            <div className="gclass">
              <ActionBar data={actionBarData} />
              <NavigationController controller={controllerData} />
            </div>
        );
      }
  });
  return home;

});
