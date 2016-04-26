define(function(require){

  var Confirm = React.createClass({

  propTypes: {
    labelbtn1: React.PropTypes.string.isRequired,
    labelbtn2: React.PropTypes.string.isRequired
  },

  onClickbtn1: function () {
    //onClick of button1
  },

  onClickbtn2: function () {
    //onClick of button2
  },

  render: function () {
    var classname = "filler";

    return(
        <div className={classname}>
          <div className="confirmbox">
            <div className="cancel">✕</div>
            <div id="btn1" onClick={this.onClickbtn1}>{this.props.labelbtn1}</div>
            <div id="btn2" onClick={this.onClickbtn2}>{this.props.labelbtn2}</div>
          </div>
        </div>
        );
      }
    });
return Confirm;
});
