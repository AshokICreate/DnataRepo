define(function(require){

  var Store = require('stores/homeStore');
  var Form = require ("controllers/form");
  var NavigationActions = require ("actions/navigationActions");
  var MultiRowController = require ("controllers/multiRowController");
  var currentItem = "";
var actualhome = React.createClass({
  getInitialState:function()
  {
    return {key:""};
  },
  _onNext:function()
  {
      var content =  <MultiRowController id={this.props.id} childId={currentItem} />;
      var rightButtonName = "Submit";
      var leftButtonName = "Back";

      var controllerData = {
        title:currentItem,
        content:content,
        rightButtonName:rightButtonName,
        leftButtonName:leftButtonName
      };

      NavigationActions.pushController(controllerData);
  },
  _onClick: function (key) {
      currentItem = key;

      var content =  <Form id={this.props.id} onRightButtonClick={this._onNext}/>;
      var rightButtonName = "Next";
      var leftButtonName = "Back";

      var controllerData = {
        title:key,
        content:content,
        rightButtonName:rightButtonName,
        leftButtonName:leftButtonName
      };

      NavigationActions.pushController(controllerData);

  },
  getContent: function () {
   var contentItems = this.props.items;
   var content = [];
   for (var i=0;i<contentItems.length;i++){
     var eachItem = contentItems[i];
     var className = "actualItem";
     var iconClass = "actualIcon icon-"+eachItem;
     content.push
     (
       <div key={i} className={className} onClick={this._onClick.bind(this, eachItem)} >
         <div className={iconClass}> </div>
         <div className="actualName">{getString(eachItem)}</div>
       </div>
     );
   }
   return content;
},

  render: function(){

    var content = this.getContent();
    return(
      <div className="actualcontroller">
       {content}
      </div>
    );

  }
});
return actualhome;
});
