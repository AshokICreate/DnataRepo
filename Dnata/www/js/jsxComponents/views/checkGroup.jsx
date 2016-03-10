define(function(require){

  var checkGroup = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    defaultchecked: React.PropTypes.string,
    options:React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  _handleChange: function(event) {
    this.props.onSave(this.props.id, event.target.value, event.target.checked);
  },

  getContents: function(){
    var array = this.props.options;
    var className = "radiogroup";
    var content = [];

    for (var i = 0; i < array.length; i++) {
        var check = this.props.value
        var flag = false;
        for(var j = 0; j< check.length; j++){
          if(array[i] === check[j]){
            flag = true;
            break;
          }
        }
        if(flag)
        {
            content.push(
                <input key={i} className={className} name="mobile" type="checkbox" onChange={this._handleChange} defaultChecked={this.props.defaultchecked} value={array[i]} checked>{array[i]}</input>
            );
          }
          else {
              content.push(
                  <input key={i} className={className} name="mobile" type="checkbox" onChange={this._handleChange} value={array[i]}>{array[i]}</input>
            );
        }
      }

      return content;
  },


  render:function(){
    var name = this.props.name;
    return(
      <div className="inputBox">
      <div className="label">{getString(name)}</div>
      {this.getContents()}
      </div>
      );
    }
  });
return checkGroup;
});
