define(function (require) {

    var ToggleButton = React.createClass ({


        onToggleButtonSegmentClick: function (i,event) {
            event.stopPropagation();
            if(i === 0){
              $(event.target).removeClass("toggle_first_segment toggleBtn_inactive").addClass( "toggle_first_segment toggleBtn_active" );
              $(event.target).next().removeClass("toggle_second_segment toggleBtn_active").addClass( "toggle_second_segment toggleBtn_inactive" );
            }else{
              $(event.target).removeClass("toggle_second_segment toggleBtn_inactive").addClass( "toggle_second_segment toggleBtn_active" );
              $(event.target).prev().removeClass("toggle_first_segment toggleBtn_active").addClass( "toggle_first_segment toggleBtn_inactive" );
            }
            this.props.onTouch(i);
        },

        render: function () {

            return (
                <div className="toggle_button_container">
                  <button className="toggle_first_segment toggleBtn_active" onClick={this.onToggleButtonSegmentClick.bind(this,0)}>{(this.props.names.length >= 2) ? this.props.names[0] : "YES"}</button>
                  <button className="toggle_second_segment toggleBtn_inactive" onClick={this.onToggleButtonSegmentClick.bind(this,1)}>{(this.props.names.length >= 2) ? this.props.names[1] : "YES"}</button>
                </div>
            );
        }
    });
    return ToggleButton;
});
