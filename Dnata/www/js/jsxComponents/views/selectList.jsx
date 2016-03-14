define(function(require) {
  var selectList = React.createClass({

  propTypes:{
    options: React.PropTypes.array.isRequired,
    defaultvalue: React.PropTypes.array,
    onSelected: React.PropTypes.func.isRequired,
    isSingle: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    var mArray = this.props.defaultvalue;
    return { temp: mArray};
  },
  checkMark: function(key,event) {
      if(this.props.isSingle)
      {
        this.props.onSelected(this.props.options[key]);
      }
      else{
        var flag = false;
        var tempArray = this.state.temp;
        for(var i=0; i<tempArray.length; i++){
          if(tempArray[i] === this.props.options[key]){
            flag = true;
            break;
          }
        }
        if(flag)
        {
          var index = tempArray.indexOf(this.props.options[key]);
          tempArray.splice(index,1);
        }
        else {
            tempArray.push(this.props.options[key]);
        }
        this.props.onSelected(tempArray);
        this.setState({temp:tempArray});
      }
  },

  getContents: function () {
    var option = this.props.options;
    var value = [];
    for (var i = 0; i < option.length; i++){
      var className = "tick hide";
      var tempArray = this.state.temp;
      var flag = false;
      for(var j=0; j<tempArray.length; j++){
        if(tempArray[j] === option[i]){
          flag = true;
          break;
        }
      }
      if(flag)
      {
        className = "tick"
      }
      value.push(
        <div className="list" key={i} onClick={this.checkMark.bind(this,i)}>
          <div className = "listtitle"> {option[i]}</div>
          <div className={className} >&#10003;</div>
        </div>
        );
      }
      return value;
    },

  render: function () {
    return(
      <div className="gclass listContainer">
      {this.getContents()}
      </div>
      );
    }
  });
  return selectList;
});
