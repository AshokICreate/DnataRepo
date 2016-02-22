define(function(require){

  var comboBox = React.createClass({

    // getInitialState: function() {
    //   var val = null;
    //   return { value: val};
    // },

   _handleChange: function(event) {
//    this.setState({value: event.target.value});
    this.props.onSave(this.props.id, event.target.value);
   },

    render: function(){
      var label = this.props.name;
    //  var value = this.state.value;
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
        <div className="label">{getString(this.props.label)}</div>
        <select onChange={this._handleChange}>
        {content}
        </select>
        </div>
      );
    }
  });
  return comboBox;
});
