define(function (require) {
  var TextLabel = require("views/textLabel");
  var textareaBox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired,
    defaultvalue: React.PropTypes.string,
    onSave: React.PropTypes.func.isRequired
  },
    getInitialState: function() {
      var val = this.props.defaultvalue;
      return { value: val};
    },

    _handleChange: function(event) {
      this.setState({value: event.target.value});
    },

    _save: function() {
        if(event.target.value !== "")
          this.props.onSave(this.props.id, event.target.value);

    },
    componentWillReceiveProps:function(nextProps) {
        this.setState({value:nextProps.defaultvalue});
    },
    render: function() {
      var value = this.state.value;
      var className = "descfield";

    return (
          <div className="inputBox">
            <TextLabel name={this.props.name} isRequired={this.props.isRequired}/>
            <textarea name="description" maxLength="255" className={className} id={this.props.id} onChange={this._handleChange} onBlur={this._save} value={value}/>
          </div>
          );
      }
    });
    return textareaBox;

});
