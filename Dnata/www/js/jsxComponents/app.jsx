define(function (require) {

    // var NavigationStore = require ("stores/navigationStore");
    // var NavigationController = require ("controllers/navigationController");
    // var NavigationActions = require ("actions/navigationActions");
    // var Form = require ("controllers/form");
    // var Button = require ("views/button");
    var Store = require("stores/appStore");
    var Home = require ("controllers/home");
    var Login = require ("controllers/login");
    var app = React.createClass({
        displayName: 'dnata',

    componentDidMount: function () {
        Store.addChangeListener (this.getContents);
    },
    componentWillUnmount: function () {
        Store.removeChangeListener (this.getContents);
    },
    getContents:function () {
        var content;
        if(Store.showScreen()){
          content = <Home />;
        }
        else {
          content = <Login />;
        }
        return content;
    },
    render: function() {
      return (
        <div className="gclass">
        {this.getContents()}
        </div>
      );
    }
  });
  return app;
});
