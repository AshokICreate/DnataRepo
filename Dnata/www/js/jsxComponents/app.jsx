define(function (require) {


    var Home = require ("controllers/home");
    var Login = require ("controllers/login");
    var Feedback = require("controllers/feedback");
    var NavigationController = require ("controllers/navigationController");
    var NavigationActions = require ("actions/navigationActions");
    var FormConstants = require ("constants/formConstants");
    var FormStore = require("stores/formStore");
    var LoginConstants = require ("constants/loginConstants");
    var LoginStore = require("stores/loginStore");
    var Msg = require("views/msgBox");

    var app = React.createClass({
        displayName: 'dnata',

    componentDidMount: function () {
        FormStore.addChangeListener (FormConstants.Clear_Data_Event,this.onChange);
        LoginStore.addChangeListener (LoginConstants.Login_Issued_Event,this.onChange);
        LoginStore.addChangeListener (LoginConstants.Logout_Issued_Event,this.onChange);
        LoginStore.addChangeListener (LoginConstants.Pre_Session_Expiry_Event,this.showExpiryPrompt);
    },
    componentWillUnmount: function () {
        FormStore.removeChangeListener (FormConstants.Clear_Data_Event,this.onChange);
        LoginStore.removeChangeListener (LoginConstants.Login_Issued_Event,this.onChange);
        LoginStore.removeChangeListener (LoginConstants.Logout_Issued_Event,this.onChange);
        LoginStore.removeChangeListener (LoginConstants.Pre_Session_Expiry_Event,this.showExpiryPrompt);
    },
    onChange:function()
    {
      this.setState(this.getContents());
    },
    _reLogin:function()
    {
        NavigationActions.removePopup();

    },
    showExpiryPrompt:function()
    {
        NavigationActions.presentPopup(<Msg msgLabel={"session_expiry_prompt_msg"} buttons={msgButtonsArray} onMsgClick={this._reLogin}/>);
    },
    getContents:function () {
        var content;
        if(LoginStore.isUserLoggedIn()){
          var controllerData = {
            title:"report_injury",
            content: <Home />,
            rightButtonName:"Logout"
          };
          content = <NavigationController controller={controllerData} />
        }
        else {
          content = <Login />;
        }
        return {content:content};
    },
    getInitialState:function()
    {
      return this.getContents();
    },
    render: function() {
      var content = this.state.content;
      return (
        <div className="gclass">
        {content}
        </div>
      );
    }
  });
  return app;
});
