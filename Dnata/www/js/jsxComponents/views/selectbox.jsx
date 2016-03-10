define(function (require) {

  var selectBox = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    click: React.PropTypes.func.isRequired
  },



  render: function () {
    var name = this.props.name;
    return(
      <div>
      <div className="label">{getString(name)}</div>
      <br/>
      <input className="selectBox" onClick={this.props.click}><div id="line"></div> <div id="arrow"></div></input>
      </div>
    );
  }
  });
  return selectBox;
});
