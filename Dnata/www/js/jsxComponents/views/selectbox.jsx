define(function (require) {

  var selectBox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onSelectBoxClick: React.PropTypes.func.isRequired,
    defaultvalue: React.PropTypes.array
  },

  _onClick:function()
  {
      this.props.onSelectBoxClick(this.props.id,this.props.defaultvalue);
  },
  render: function () {
    var name = this.props.name;
    var dvalue = this.props.defaultvalue;
    var content = [];
    for(var i = 0; i < dvalue.length; i++){
      content.push(
      <li className="selectlist">dvalue[i]</li>
      );
    }
    return(
      <div className="inputBox">
      <div className="label">{getString(name)}</div>
      <div className="selectBox" onClick={this._onClick}>
        {content}
        <div id="line">|</div> <div id="arrow"></div>
      </div>
      </div>
    );
  }
  });
  return selectBox;
});
