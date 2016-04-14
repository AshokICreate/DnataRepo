define(function(require){

  var TextArea = require('views/textareaBox');
  var ToggleButton =  require ("views/toggleButton");
  var SelectBox = require ("views/selectBox");
  var feedback = React.createClass({

  render: function () {
    <div>
      <TextArea />
      <SelectBox />
      <ToggleButton />
    </div>
  }
  });
});
