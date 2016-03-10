define(function (require) {

var textareaBox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    defaultvalue: React.PropTypes.string,
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
          <div className="descBox">
          <div className="label">{getString(name)}</div>
          <textarea name="description" className={className} defaultValue={this.props.defaultvalue} onChange={this._handleChange} onBlur={this._save} value={value}/>
          </div>
          );
      }
    });
    return textareaBox;

});
