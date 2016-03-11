define (function (require) {
    var Back = React.createClass ({
        render: function () {
            return (
                <div className="backBtContainer" onClick={this.props.onClick}>
                    <div>{getString(this.props.name)}</div>
                </div>
            );
        }
    });
    return Back;
});
