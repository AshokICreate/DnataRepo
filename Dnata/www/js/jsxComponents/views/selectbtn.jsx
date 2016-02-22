define (function (require) {
    var selectbutton = React.createClass ({
        render: function () {
            return (
                <div className="buttonContainer">
                  <div className="buttonName" onClick={this.props.click}>{getString(this.props.name)}</div>
                </div>
            );
        }
    });
    return selectbutton;
});
