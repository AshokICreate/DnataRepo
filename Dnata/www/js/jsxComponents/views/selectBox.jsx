define(function (require) {

  var selectBox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool.isRequired,
    onSelectBoxClick: React.PropTypes.func.isRequired,
    defaultvalues: React.PropTypes.array
  },

  _onClick:function()
  {
      this.props.onSelectBoxClick(this.props.id,this.props.defaultvalue);
  },
  render: function () {
    var name = this.props.name;
    var dvalue = this.props.defaultvalues;
    var content = [];
    var classRequired = "hide";
    if(this.props.isRequired)
    {
      classRequired = "require";
    }
    if(dvalue)
    {
      for(var i = 0; i < dvalue.length; i++){
        content.push(
        <li className="dlist" key={i}>{dvalue[i].value}</li>
        );
      }
    }
    return(
      <div className="inputBox">
      <div className={classRequired}>*</div>
      <div className="label">{getString(name)}</div>
      <div className="selectBox" onClick={this._onClick}>
        <div className="dlistclass">
          {content}
        </div>
        <span className="icon-Next" id="arrow"></span>
      </div>
      </div>
    );
  }
  });
  return selectBox;
});
