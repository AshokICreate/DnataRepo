define(function (require) {

  var textBox = React.createClass({
      getInitialState: function() {
        var val = "";
        return { value: val};
      },
      _handleChange: function(event) {
        this.setState({value: event.target.value});
      },
      _save: function(event) {
        this.props.onSave(event.target.value);
        this.setState({
          value: ''
        });
      },
      render: function() {
        var value = this.state.value;
        var name = this.props.name;
        var className = "field";

        return (
              <div className="inputBox">
                <div className="label">{getString(name)}</div>
                <input className={className} onChange={this._handleChange} onBlur={this._save} value={value}/>
              </div>
          );
      }
    });

  return textBox;
});
