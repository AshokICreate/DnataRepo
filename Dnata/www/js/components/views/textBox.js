define(function (require) {

  var textBox = React.createClass({displayName: "textBox",

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
      _save: function(event) {
        if(event.target.value !== "")
          this.props.onSave(this.props.id, event.target.value);
      },
      render: function() {
        var value = this.state.value;
        var name = this.props.name;
        var className = "field";

        return (
              React.createElement("div", {className: "inputBox"}, 
                React.createElement("div", {className: "label"}, getString(name)), 
                React.createElement("input", {className: className, onChange: this._handleChange, onBlur: this._save, value: value})
              )
          );
      }
    });

  return textBox;
});
