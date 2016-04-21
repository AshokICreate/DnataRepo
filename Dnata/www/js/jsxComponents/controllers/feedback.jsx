define(function(require){
  var NavigationActions = require ("actions/navigationActions");
  var NavigationStore = require ("stores/navigationStore");
  var NavigationConstants = require ("constants/navigationConstants");

  var TextArea = require("views/textareaBox");
  var ToggleButton =  require ("views/toggleButton");
  var SelectBox = require ("views/selectBox");
  var Select = require("controllers/select");

  var feedbackObj = {
    feedback_title:"",
    primary_location:"",
    receive_update:""
  }
  var feedback = React.createClass({

  componentDidMount: function () {
      NavigationStore.addChangeListener (NavigationConstants.Right_Click_Event,this._onSubmit);
  },
  componentWillUnmount: function () {
      NavigationStore.removeChangeListener (NavigationConstants.Right_Click_Event,this._onSubmit);
  },
  _onSubmit:function()
  {

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
      url             : "http://172.27.138.47/metricstream", // Location of the service
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
    var isSingleSelect = false;
    var content= <Select options={["DXB","ZUR","NZ"]} isSingleSelect={isSingleSelect} onSave={this._onSave} id={"primary_location"} />
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
        <TextArea name={"What feedback would you like to provide"} onSave={this._onSave} id={"feedback_title"} defaultvalue={feedbackObj["feedback_title"]}/>
        <SelectBox name={"Where are you providing feedback for"} onSelectBoxClick={this._onSelect} id={"primary_location"} defaultvalues={[feedbackObj["primary_location"]]}/>
        <ToggleButton name={"Send feedback anonymously"} options={["YES","NO"]} id={"receive_update"} onSave={this._onSave} defaultvalue={feedbackObj["receive_update"]} />
      </div>
        );
      }
  });
  return feedback;
});
