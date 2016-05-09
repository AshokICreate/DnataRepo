define(function(require){

  var Store = require ("stores/formStore");
  var Form = require ("controllers/form");
  var NavigationActions = require ("actions/navigationActions");
  var NavigationStore = require("stores/navigationStore");
  var NavigationConstants = require ("constants/navigationConstants");
  var MultiRowController = require ("controllers/multiRowController");
  var Msg = require("views/msgBox");
  var currentItem = "";
  var actualhome = React.createClass({
    getInitialState:function()
    {
      var state = NavigationStore.getControllerState();
      if(!state)
        state="";
      return {key:"",itemsSelected:state};
    },

    componentDidMount: function () {
        NavigationStore.addChangeListener (NavigationConstants.Back_Click_Event,this._onBackButtonClick);
    },
    componentWillUnmount: function () {
        NavigationStore.removeChangeListener (NavigationConstants.Back_Click_Event,this._onBackButtonClick);
    },
    _onBackButtonClick:function(){
      var msgButtonsArray = [{"title":"yes"},{"title":"no"}];
      if(Store.isDataAvailable())
      {
        NavigationActions.presentPopup(<Msg msgLabel={"clear_data"} buttons={msgButtonsArray} onMsgClick={this._clearData}/>);
      }
      else
      {
        NavigationActions.popController();
      }
    },
    _clearData:function(title){
      NavigationActions.removePopup();
        if(title === "yes")
        {
          Store.clearFormData();
          NavigationActions.popController();
        }
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

      var itemsSelected = key;
      this.setState({itemsSelected:itemsSelected});
      var content =  <Form id={this.props.id} onRightButtonClick={this._onNext}/>;
      var rightButtonName = "Next";
      var leftButtonName = "Back";

      var controllerData = {
        title:key,
        content:content,
        rightButtonName:rightButtonName,
        leftButtonName:leftButtonName
      };

      NavigationActions.pushController(controllerData,itemsSelected);

    },
    getContent: function () {
     var itemsSelected = this.state.itemsSelected;
     var contentItems = this.props.items;
     var content = [];
     for (var i=0;i<contentItems.length;i++)
     {
       var eachItem = contentItems[i];
       var className = "actualItem";
       if(itemsSelected === eachItem)
       {
         className= "actualItem highlight"
       }
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
