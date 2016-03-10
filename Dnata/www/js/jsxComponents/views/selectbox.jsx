define(function (require) {

  var selectBox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onSelectBoxClick: React.PropTypes.func.isRequired
  },
  _onClick:function()
  {
      this.props.onSelectBoxClick(this.props.id);
  },
  render: function () {
    var name = this.props.name;
    return(
      <div>
      <div className="label">{getString(name)}</div>
      <br/>
      <input className="selectBox" onClick={this._onClick}><div id="line"></div> <div id="arrow"></div></input>
      </div>
    );
  }
  });
  return selectBox;
});
