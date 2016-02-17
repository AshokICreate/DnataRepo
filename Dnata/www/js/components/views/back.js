define (function (require) {
    var NavigationActions = require ("actions/navigationActions");
    var Back = React.createClass ({displayName: "Back",
        _onClick: function (event) {
           NavigationActions.popController();
        },
        render: function () {
            return (
                React.createElement("div", {className: "backBtContainer", onClick: this._onClick}, 
                    React.createElement("div", null, getString(this.props.name))
                )
            );
        }
    });
    return Back;
});
