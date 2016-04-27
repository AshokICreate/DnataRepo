define(function(require){

  var Confirm = React.createClass({

  propTypes: {
    buttons:  React.PropTypes.array.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  _onAction: function(i){
    var title =  this.props.buttons[i].title;
    return this.props.onAction(title);
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
        <div className={buttonClass} onClick={this._onAction.bind(this,i)}>{button[i].title}</div>
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
