define(function (require) {

    var SubmitButton = React.createClass ({


        onSubmitButtonClick: function (event) {
            event.stopPropagation();
            if($(event.target).hasClass("submit_btn green_background")){
              $(event.target).removeClass("submit_btn green_background").addClass( "submit_btn high_grey_background" );
            }else{
              $(event.target).removeClass("submit_btn high_grey_background").addClass( "submit_btn green_background" );
            }
        },


        render: function () {

            return (
                <div className="submit_container">
                  <button className="submit_btn green_background" onClick={this.onSubmitButtonClick}>&#10003;</button>
                </div>
            );
        }
    });
    return SubmitButton;
});
