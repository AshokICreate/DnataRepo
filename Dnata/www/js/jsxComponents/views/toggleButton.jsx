define(function (require) {

    var ToggleButton = React.createClass ({

      propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array,
        onSave: React.PropTypes.func.isRequired
      },

        onToggleButtonSegmentClick: function (i,event) {
            var toggleButton = (this.state.selectedbutton === 1)?2:1;
            this.setState({selectedbutton: toggleButton});
            this.props.onSave(this.props.options[toggleButton]);
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
                  <div className="label">{getString(this.props.name)}</div>
                  <button className={firstButtonClassName} onClick={this.onToggleButtonSegmentClick.bind(this)}>{(this.props.options.length >= 2) ? this.props.options[0] : "YES"}</button>
                  <button className={secondButtonClassName} onClick={this.onToggleButtonSegmentClick.bind(this)}>{(this.props.options.length >= 2) ? this.props.options[1] : "NO"}</button>
                </div>
            );
        }
    });
    return ToggleButton;
});
