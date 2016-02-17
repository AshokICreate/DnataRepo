define(function (require) {
  var TextBox= require('views/textBox');
  var TextareaBox = require('views/textareaBox');
  var Button = require ("views/button");
  var actions = require ("actions/formActions");
  var Store = require ("stores/formStore");

  function getState () {
      return {
          entered: Store.getEntered()
      };
  }

  var form = React.createClass ({displayName: "form",
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
      render: function () {
          var content = this.state.entered.map(function(text,i)
                    {
                        return (React.createElement("li", {key: i}, text, " "));
                    }
                  );
          return (
              React.createElement("div", null, 
                React.createElement(TextBox, {name: "Enter text", onSave: this._onSave}), 
                content, 
                React.createElement(TextareaBox, {name: "Enter description", onSave: this._onSave}), 
                React.createElement(Button, {name: 'Clear', click: this.onclick}, " ")

              )
          );
      }
  });
  return form;

});
