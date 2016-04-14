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
    if(!mArray){
      mArray = [];
    }
    return { temp: mArray, options: this.props.options};
  },
  checkMark: function(key,event) {
      if(this.props.isSingle)
      {
        this.props.onSelected(this.state.options[key]);
      }
      else{
        var flag = false;
        var tempArray = this.state.temp;
        for(var i=0; i<tempArray.length; i++){
          if(tempArray[i] === this.state.options[key]){
            flag = true;
            break;
          }
        }
        if(flag)
        {
          var index = tempArray.indexOf(this.state.options[key]);
          tempArray.splice(index,1);
        }
        else {
            tempArray.push(this.state.options[key]);
        }
        this.props.onSelected(tempArray);
        this.setState({temp:tempArray});
      }
  },

  searchText: function () {
    var text = $(".searchid").val().toLowerCase();;
    var searcharray = [];
    for(var i=0;i<this.props.options.length;i++){
      if(this.props.options[i].toLowerCase().indexOf(text)>=0){
          searcharray.push(this.props.options[i]);
      }
    }
    if(text.length === 0){
      searcharray = this.props.options;
    }
    this.setState({options:searcharray});

 },

  getContents: function () {
    var option = this.state.options;
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
        <div className="searchclass">
          <input className="searchid" type="search" placeholder="Search" onChange={this.searchText}></input>
        </div>
      {this.getContents()}
      </div>
      );
    }
  });
  return selectList;
});
