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
            <div className="msgLabel"><center>{getString(promptLabel)}</center></div>
            <center><div className="promptField"><input type="password" id="sessionkey" placeholder="Enter session key"></input></div></center>
            <div className="msgBtnClass">
              <center className="centerBox"><div className="msgBtn" onClick={this._onAction}>OK</div></center>
            </div>
          </div>
        </div>
      );
    }
  });
return Prompt;
});
