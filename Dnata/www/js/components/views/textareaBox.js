define(function (require) {

var textareaBox = React.createClass({displayName: "textareaBox",

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onSave: React.PropTypes.func.isRequired
  },
    getInitialState: function() {
      var val = this.props.value;
      return { value: val};
    },

    _handleChange: function(event) {
      this.setState({value: event.target.value});
    },

    _save: function() {
        if(event.target.value !== "")
          this.props.onSave(this.props.id, event.target.value);

    },
    render: function() {
      var value = this.state.value;
      var name = this.props.name;
      var className = "descBox";

    return (
          React.createElement("div", {className: "descBox"}, 
          React.createElement("div", {className: "label"}, getString(name)), 
          React.createElement("textarea", {name: "description", className: className, onChange: this._handleChange, onBlur: this._save, value: value})
          )
          );
      }
    });
    return textareaBox;

});
