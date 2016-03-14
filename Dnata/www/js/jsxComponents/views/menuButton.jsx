define (function (require) {
    var menuButton = React.createClass ({
        render: function () {
            var className = "menuBtContainer"
            var titleClass = "titleLeft"
            if("right"===this.props.align)
            {
                className="menuBtContainer right"
                titleClass = "titleRight"
            }
            return (
                <div className={className} onClick={this.props.onClick}>
                    <div className={titleClass}>{getString(this.props.name)}</div>
                </div>
            );
        }
    });
    return menuButton;
});
