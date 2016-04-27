define(function(require){

  var Confirm = React.createClass({

  propTypes: {
    buttons:  React.PropTypes.array.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  render: function () {
    var content = [];
    var button = this.props.buttons;
    for (var i=0; i<button.length;i++)
    {
      var buttonClass = "btn";
      if(i%2 !== 0)
      {
        buttonClass = buttonClass+" highlight";
      }
      content.push(
        <div className={buttonClass} onClick={button[i].action}>{button[i].title}</div>
      );
    }
    return(
          <div className="confirmBox">
            <div className="cancel" onClick={this.props.onCancel}>✕</div>
              {content}
          </div>
        );
      }
    });
return Confirm;
});
