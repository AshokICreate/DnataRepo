define(function (require) {
  var Store = require('stores/homeStore');
  var Grid = require ("controllers/gridController");
  var ActualInjury = require ("controllers/actualInjury");
  var NavigationController = require ("controllers/navigationController");
  var NavigationActions = require ("actions/navigationActions");
  var Feedback = require("controllers/feedback");
  var NavigationStore = require ("stores/navigationStore");
  var LoginActions = require ('actions/loginActions');
  var NavigationConstants = require ("constants/navigationConstants");
  var home = React.createClass({

  componentDidMount: function () {
      NavigationStore.addChangeListener (NavigationConstants.Right_Click_Event,this._onRightButtonClick);
  },

  componentWillUnmount: function () {
      NavigationStore.removeChangeListener (NavigationConstants.Right_Click_Event,this._onRightButtonClick);
  },
  _onRightButtonClick:function(){
      LoginActions.logOut();
  },

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
        rightButtonName="Next";
        break;
      }

      case "feedback":
      {
        content = <Feedback />;
          rightButtonName="Submit";
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
       var className = "sectionEvenItem";
       if(i%2 !== 0)
       {
         className = "sectionOddItem";
       }
       var iconClass = "sectionIcon icon-"+eachItem;
       content.push(
            <div key={i} className={className} onClick={this._handleChange.bind(this, eachItem)}>
              <div className={iconClass}> </div>
              <div className="sectionName" >{getString(eachItem).toUpperCase()}</div>
            </div>
       );
     }
     return content;
  },

  render:function(){
    var content = this.getContent();

    return(
      <div className="gclass">
          {content}
      </div>
      );
    }
  });
  return home;
});
