define(function(require) {
  var NavigationActions = require ("actions/navigationActions");
  var selectList = React.createClass({

  propTypes:{
    options: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    isSingle: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    var mArray = [];
    return { temp: mArray};
  },

  checkMark: function(key,event) {
      if(this.props.isSingle)
      {
        this.props.onSave(this.props.options[key]);
        NavigationActions.popController();
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
        this.setState({temp:tempArray});
        this.props.onSave(this.state.temp);
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
          <div className = "title"> {option[i]}</div>
          <label className={className} >&#10003;</label>
        </div>
        );
      }
      return value;
    },

  render: function () {
    return(
      <div>
      {this.getContents()}
      </div>
      );
    }
  });
  return selectList;
});
