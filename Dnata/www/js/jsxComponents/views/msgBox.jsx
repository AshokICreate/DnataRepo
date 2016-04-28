define(function(require){

  var Msg = React.createClass({

  propTypes: {
    msgLabel: React.PropTypes.string.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onOK: React.PropTypes.func.isRequired
  },

  render: function () {
    var content = [];

    return(
          <div className="msgBox">
            <div className="msgClass">
              <div className="msgLabel">{this.props.msgLabel}</div>
              <div className="msgBtn" onClick={this.props.onOK}>OK</div>
            </div>
          </div>
        );
      }
    });
return Msg;
});
