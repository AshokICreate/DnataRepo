define(function(require){
  var NavigationController = require ("controllers/navigationController");
  var NavigationActions = require ("actions/navigationActions");
  var TextArea = require("views/textareaBox");
  var ToggleButton =  require ("views/toggleButton");
  var SelectBox = require ("views/selectBox");
  var Select = require("controllers/select");

  var feedback = React.createClass({


  _onSave: function(id,value) {
    console.log("id and value are "+id,value);
  },

  _onSelect: function() {
    var isSingleSelect = false;
    var content= <Select options={["DXB","ZUR","NZ"]} isSingleSelect={isSingleSelect} onSave={this._onSave} id={"select_id"} />
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
        <TextArea name={"What feedback would you like to provide"} onSave={this._onSave} id={"fdbk_id"}/>
        <SelectBox name={"Where are you providing feedback for"} onSelectBoxClick={this._onSelect}/>
        <ToggleButton name={"Send feedback anonymously"} options={["YES","NO"]} id={"toggle_id"} onSave={this._onSave}/>
      </div>
        );
      }
  });
  return feedback;
});
