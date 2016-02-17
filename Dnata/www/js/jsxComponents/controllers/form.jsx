define(function (require) {
  var TextBox= require('views/textBox');
  var TextareaBox = require('views/textareaBox');
  var ToggleButton = require("views/toggleButton");
  var SubmitButton = require("views/submitbutton");  var Button = require ("views/button");
  var actions = require ("actions/formActions");
  var Store = require ("stores/formStore");

  function getState () {
      return {
          entered: Store.getEntered()
      };
  }

  var form = React.createClass ({
      onclick:function()
      {
          actions.clear();
      },
      getInitialState: function () {
          return getState();
      },
      componentDidMount: function () {
          Store.addChangeListener (this._onChange);
      },
      componentWillUnmount: function () {
          Store.removeChangeListener (this._onChange);
      },
      _onChange: function () {
          this.setState (getState ());
      },
      _onSave:function(text)
      {
          actions.createText(text);
      },
      onToggleButton:function(index){
        console.log("toggle button clicked",index);
      },



      render: function () {
          var content = this.state.entered.map(function(text,i)
                    {
                        return (<li key={i}>{text} </li>);
                    }
                  );
          return (
              <div>
                <TextBox name={"Enter text"} onSave={this._onSave}/>
                {content}
                <TextareaBox name={"Enter description"} onSave={this._onSave}/>
                <Button name={'Clear'} click={this.onclick}> </Button>
                <ToggleButton names={['First', 'Second']} onTouch={this.onToggleButton}/>
                <SubmitButton/>
              </div>
          );
      }
  });
  return form;

});
