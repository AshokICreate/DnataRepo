define(function(require){

  var radioGroup = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    defaultchecked: React.PropTypes.string,
    options:React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired
  },
  _handleChange: function(event) {
    this.props.onSave(this.props.id, event.target.value);
  },

  render:function(){
    var name = this.props.name;
    var array = this.props.options;
    var className = "radiogroup";
    var content = [];

    for (var i = 0; i < array.length; i++) {

        if(array[i] === this.props.value)
        {
          content.push(
              <input key={i} className={className} name="gender" type="radio" onChange={this._handleChange} defaultChecked={this.props.defaultchecked} value={array[i]} checked>{array[i]}</input>
          );
        }else {
          content.push(
              <input key={i} className={className} name="gender" type="radio" onChange={this._handleChange} value={array[i]} >{array[i]}</input>
          );
        }


      }
    return(
      <div className="inputBox">
      <div className="label">{getString(name)}</div>
      {content}
      </div>
      );
    }
  });
return radioGroup;
});
