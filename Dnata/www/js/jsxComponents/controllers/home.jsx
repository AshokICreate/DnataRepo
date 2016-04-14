define(function (require) {
  var Store = require('stores/homeStore');
  var Grid = require ("controllers/gridController");
  var ActualInjury = require ("controllers/actualInjury");
  var NavigationController = require ("controllers/navigationController");
  var NavigationActions = require ("actions/navigationActions");
  var home = React.createClass({

  _handleChange: function(key){
    var content;
    var leftButtonName = "Back";
    var rightButtonName;
    switch(key){
      case "MS_INC_ACTUAL_INJURY":
      {
        content = <ActualInjury items={Store.getActualInjuryFormItems()} id={key} />;
        break;
      }

      case "MS_INC_POTENTIAL_INJ_FORM":
      {
        content = <Grid items={Store.getPotentialInjuryFormItems()} id={key} />;
        rightButtonName="Next"
        break;
      }

      case "feedback":
      {
        break;
      }
    }

    var controllerData = {
      title:key,
      content:content,
      rightButtonName:rightButtonName,
      leftButtonName:leftButtonName
    };

    NavigationActions.pushController(controllerData);
  },

  getContent:function(){
     var contentItems = Store.getHomeMenuItems();

     var content = [];
     for (var i=0;i<contentItems.length;i++){

       var eachItem = contentItems[i]
       var className = "sectionItem";
       var iconClass = "sectionIcon icon-"+eachItem;
       content.push(
            <div key={i} className={className} onClick={this._handleChange.bind(this, eachItem)}>
              <div className={iconClass}> </div>
              <div className="sectionName" >{getString(eachItem)}</div>
            </div>
       );
     }
     return content;
  },

  render:function(){
    var content = this.getContent();
    var controllerData = {
      title:"report_injury",
      content:content,
      rightButtonName:"logout"
    };

    return(
      <NavigationController controller={controllerData} />
      );
    }
  });
  return home;
});
