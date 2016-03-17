define (function (require) {
    var menuButton = React.createClass ({
        render: function () {
            var className = "menuBtContainer"
            var titleClass = "menuBtTitle"
            if("right"===this.props.align)
            {
                className="menuBtContainer right"
                titleClass = "menuBtTitle titleRight"
            }

            if("Submit"===this.props.name){
                titleClass = titleClass+" icon-Save"
            }else if("Back"===this.props.name){
              titleClass = titleClass+" icon-Back"
            }else if("Next"===this.props.name){
              titleClass = titleClass+" icon-Next"
            }
            return (
                <div className={className} onClick={this.props.onClick}>
                    <div className={titleClass}></div>
                </div>
            );
        }
    });
    return menuButton;
});
