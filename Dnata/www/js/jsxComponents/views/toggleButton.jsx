define(function (require) {

    var ToggleButton = React.createClass ({

      propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array,
        id: React.PropTypes.string.isRequired,
        onSave: React.PropTypes.func.isRequired,
        defaultvalue:React.PropTypes.string
      },

        onToggleButtonSegmentClick: function (i,event) {
            var toggleButton = (this.state.selectedbutton === 1)?2:1;
            this.setState({selectedbutton: toggleButton});
            this.props.onSave(this.props.id,this.props.options[toggleButton-1]);
        },

        getInitialState: function(){
            var index =1;
            if(this.props.defaultvalue && this.props.defaultvalue !== "" && this.props.options )
            {
                index = this.props.options.indexOf(this.props.defaultvalue)+1;
                if(index<1)
                  index = 1;
            }
            return{
              selectedbutton: index

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
