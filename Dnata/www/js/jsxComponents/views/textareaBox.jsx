define(function (require) {

var  ENTER_KEY_CODE = 13;

var textareaBox = React.createClass({
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
          <div className="descBox">
          <div className="label">{getString(name)}</div>
          <textarea name="description" className={className} onChange={this._handleChange} onKeyDown={this._onKeyDown} value={value}/>
          </div>
          );
      }
    });
    return textareaBox;

});
