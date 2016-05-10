define(function (require) {


    var Home = require ("controllers/home");
    var Login = require ("controllers/login");
    var Feedback = require("controllers/feedback");
    var NavigationController = require ("controllers/navigationController");
    var FormConstants = require ("constants/formConstants");
    var FormStore = require("stores/formStore");
    var LoginStore = require("stores/loginStore");

    var app = React.createClass({
        displayName: 'dnata',

    componentDidMount: function () {
        FormStore.addChangeListener (FormConstants.Clear_Data_Event,this.onChange);
        LoginStore.addChangeListener (this.onChange);
    },
    componentWillUnmount: function () {
        FormStore.removeChangeListener (FormConstants.Clear_Data_Event,this.onChange);
        LoginStore.removeChangeListener (this.onChange);
    },
    onChange:function()
    {
      this.setState(this.getContents());
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
