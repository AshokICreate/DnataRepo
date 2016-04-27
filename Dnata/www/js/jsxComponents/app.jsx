define(function (require) {

    var Store = require("stores/appStore");
    var LoginStore = require("stores/loginStore");
    var Home = require ("controllers/home");
    var Login = require ("controllers/login");
    var Feedback = require("controllers/feedback");
    var NavigationController = require ("controllers/navigationController");
    var NavigationActions = require ("actions/navigationActions");
    var NavigationConstants = require ("constants/navigationConstants");

    var app = React.createClass({
        displayName: 'dnata',

    componentDidMount: function () {
        Store.addChangeListener (this.reInitiateApp);
        LoginStore.addChangeListener (this.onChange);
    },
    componentWillUnmount: function () {
        Store.removeChangeListener (this.reInitiateApp);
        LoginStore.removeChangeListener (this.onChange);
    },
    reInitiateApp:function()
    {
        //this.onChange();
        var that = this;
        setTimeout(function(){ that.onChange(); }, 100);
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
