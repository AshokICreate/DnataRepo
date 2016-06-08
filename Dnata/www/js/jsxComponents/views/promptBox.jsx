define(function(require){

  var Prompt = React.createClass({

  propTypes: {
    promptLabel: React.PropTypes.string.isRequired,
    onPromptClick: React.PropTypes.func.isRequired
  },

  _onAction: function(){
      var sessionKey = $("#sessionkey").val();
      return this.props.onPromptClick(sessionKey);
  },

  render: function (){
    var promptLabel = this.props.promptLabel;
      return(
        <div className="msgBox">
          <div className="msgClass">
            <center><div className="msgLabel">{getString(promptLabel)}</div></center>
            <center><div className="promptField"><input type="password" id="sessionkey" placeholder="Enter password"></input></div></center>
            <center className="centerBox">
              <div className="msgBtnClass">
                <div className="msgBtn" onClick={this._onAction}>OK</div>
              </div>
            </center>
          </div>
        </div>
      );
    }
  });
return Prompt;
});
