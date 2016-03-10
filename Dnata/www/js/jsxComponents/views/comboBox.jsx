define(function(require){

  var comboBox = React.createClass({

    propTypes: {
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
      defaultvalue: React.PropTypes.string,
      onSave: React.PropTypes.func.isRequired
    },

   _handleChange: function(event) {
    this.props.onSave(this.props.id, event.target.value);
   },

    render: function(){
      var label = this.props.name;
      var array=this.props.options;
      var className = "field";
      var content = [];
      for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        content.push(
          <option key={i} value={obj.value}>{obj.name}</option>
        );
      }
      return(
        <div className="inputBox">
        <div className="label">{getString(label)}</div>
        <select onChange={this._handleChange} defaultValue={this.props.defaultvalue}>
        {content}
        </select>
        </div>
      );
    }
  });
  return comboBox;
});
