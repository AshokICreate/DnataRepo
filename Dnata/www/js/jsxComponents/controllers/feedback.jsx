define(function(require){
  var NavigationActions = require ("actions/navigationActions");
  var NavigationStore = require ("stores/navigationStore");
  var NavigationConstants = require ("constants/navigationConstants");

  var TextArea = require("views/textareaBox");
  var ToggleButton =  require ("views/toggleButton");
  var SelectBox = require ("views/selectBox");
  var Select = require("controllers/select");
  var Msg = require("views/msgBox");

  var feedbackObj = {
    feedback_title:"",
    primary_location:"",
    receive_update:""
  }

  var countries = [
                    {"key":"AUS", "value":"Australia"},
                    {"key":"EBL", "value":"Iraq"},
                    {"key":"MNL", "value":"Philippines"},
                    {"key":"SIN", "value":"Singapore"},
                    {"key":"GVA", "value":"Switzerland Geneva"},
                    {"key":"ZRH", "value":"Switzerland Zurich"},
                    {"key":"UAE", "value":"United Arab Emirates"},
                    {"key":"UK", "value":"United Kingdom"},

                  ]
  var feedback = React.createClass({

  componentDidMount: function () {
      NavigationStore.addChangeListener (NavigationConstants.Right_Click_Event,this._onSubmit);
  },
  componentWillUnmount: function () {
      NavigationStore.removeChangeListener (NavigationConstants.Right_Click_Event,this._onSubmit);
  },
  _onCancel:function() {
    NavigationActions.removePopup();
  },
  _onSubmit:function()
  {
    console.log("Feedback submitted");
    var isEmpty = false;
    if(!feedbackObj.feedback_title || !feedbackObj.primary_location || !feedbackObj.receive_update )
    {
      isEmpty = true;
    }
    if(isEmpty)
    {
      NavigationActions.presentPopup(<Msg msgLabel={"Please enter all mandatory fields"} onOK={this._onCancel}/>);
      return;
    }

    var localObject = feedbackObj.primary_location;
    feedbackObj.primary_location = localObject.key;

    var success = function()
    {
        NavigationActions.popController();
    }

    var error = function()
    {

    }

    var varData = JSON.stringify(feedbackObj);

    $.ajax({
      type            : "POST", //GET or POST or PUT or DELETE verb
      url             : "http://172.27.138.47/metricstream/feedbak", // Location of the service
      data            : varData, //Data sent to server
      contentType     : "application/json", // content type sent to server
      dataType        : "JSON",
      success         : success,
      error						: error,
    })

  },
  _onSave: function(id,value) {
    console.log("id and value are "+id,value);
    feedbackObj[id] = value;
  },

  _onSelect: function() {
    var isSingleSelect = true;
    var content= <Select options={countries} isSingleSelect={isSingleSelect} onSave={this._onSave} id={"primary_location"} />
    var controllerData = {
      title:getString("select"),
      content:content,
      leftButtonName:"Back",
      rightButtonName:"Submit"
    };
    NavigationActions.pushController(controllerData);

  },

  render: function () {
    return(
      <div className="form">
        <TextArea name={"What feedback would you like to provide"} isRequired={"true"} onSave={this._onSave} id={"feedback_title"} defaultvalue={feedbackObj["feedback_title"]}/>
        <SelectBox name={"Where are you providing feedback for"} isRequired={"true"} onSelectBoxClick={this._onSelect} id={"primary_location"} defaultvalues={[feedbackObj["primary_location"]]}/>
        <ToggleButton name={"Send feedback anonymously"} isRequired={"true"} options={[{"key":"1","value":"Yes"},{"key":"2","value":"No"}]} id={"receive_update"} onSave={this._onSave} defaultvalue={feedbackObj["receive_update"]} />
      </div>
        );
      }
  });
  return feedback;
});
