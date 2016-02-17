define(function (require) {

var  ENTER_KEY_CODE = 13;

var textareaBox = React.createClass({displayName: "textareaBox",
    getInitialState: function() {
      var val = "";
      return { value: val};
    },
    _handleChange: function(event) {
      this.setState({value: event.target.value});
    },
    _onKeyDown: function(event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        this._save();
      }
    },
    _save: function() {
      this.props.onSave(this.state.value);
      this.setState({
        value: ''
      });
    },
    render: function() {
    var value = this.state.value;
    var name = this.props.name;
    var className = "field";

    return (
          React.createElement("div", {className: "descBox"}, 
          React.createElement("div", {className: "label"}, getString(name)), 
          React.createElement("textarea", {name: "description", className: className, onChange: this._handleChange, onKeyDown: this._onKeyDown, value: value})
          )
          );
      }
    });
    return textareaBox;

});
