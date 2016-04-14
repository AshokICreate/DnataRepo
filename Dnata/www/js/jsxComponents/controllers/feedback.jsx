define(function(require){

  var TextArea = require("views/textareaBox");
  var ToggleButton =  require ("views/toggleButton");
  var SelectBox = require ("views/selectBox");

  var feedback = React.createClass({

  _onSave: function() {
      console.log("entered");
  },

  render: function () {
    return(
          <div className="form">
            <TextArea name={"What feedback would you like to provide"} onSave={this._onSave} id={"fdbk_id"}/>
            <SelectBox name={"Where are you providing feedback for"} onSelectBoxClick={this._onSave}/>
            <ToggleButton name={"Send feedback anonymously"} options={["YES","NO"]} id={"toggle_id"} onSave={this._onSave}/>
          </div>
        );
      }
  });
  return feedback;
});
