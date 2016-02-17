define(function (require) {

    // var NavigationStore = require ("stores/navigationStore");
    // var NavigationController = require ("controllers/navigationController");
    // var NavigationActions = require ("actions/navigationActions");
    // var Form = require ("controllers/form");
    // var Button = require ("views/button");
    var Home = require ("controllers/home");

    var app = React.createClass({
        displayName: 'dnata',
        render: function() {
            return (
                React.createElement(Home, null)
            );
        }
    });
    return app;
});
