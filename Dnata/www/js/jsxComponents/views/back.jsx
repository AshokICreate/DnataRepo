define (function (require) {
    var NavigationActions = require ("actions/navigationActions");
    var Back = React.createClass ({
        _onClick: function (event) {
           NavigationActions.popController();
        },
        render: function () {
            return (
                <div className="backBtContainer" onClick={this._onClick}>
                    <div>{getString(this.props.name)}</div>
                </div>
            );
        }
    });
    return Back;
});
