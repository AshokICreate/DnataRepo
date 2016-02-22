define(function (require) {

    var ToggleButton = React.createClass ({

        onToggleButtonSegmentClick: function (i,event) {
            var toggleButton = (this.state.selectedbutton === 1)?2:1;
            this.setState({selectedbutton: toggleButton});
            this.props.onTouch(this.props.names[toggleButton]);
        },

        getInitialState: function(){
            return{
              selectedbutton: 1

            }
        },

        render: function () {

           var firstButtonClassName = " ";
           var secondButtonClassName = " ";
           if(this.state.selectedbutton === 1){
              firstButtonClassName = "toggle_first_segment toggleBtn_active";
              secondButtonClassName = "toggle_second_segment";
           }else{
              firstButtonClassName = "toggle_first_segment";
              secondButtonClassName = "toggle_second_segment toggleBtn_active";
           }

            return (
                <div className="toggle_button_container">
                  <button className={firstButtonClassName} onClick={this.onToggleButtonSegmentClick.bind(this)}>{(this.props.names.length >= 2) ? this.props.names[0] : "YES"}</button>
                  <button className={secondButtonClassName} onClick={this.onToggleButtonSegmentClick.bind(this)}>{(this.props.names.length >= 2) ? this.props.names[1] : "NO"}</button>
                </div>
            );
        }
    });
    return ToggleButton;
});
