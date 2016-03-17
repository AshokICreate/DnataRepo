define(function(require){

  var  Calendar = React.createClass({

    propTypes: {
      name: React.PropTypes.string.isRequired,
    },

    render: function() {
      var name = this.props.name;
      var className = "field";

      return(
        <div className="datetime">
          <div className="label">{getString(name)}</div>
          <input type="date" className={className} name="cdate"/>
        </div>
      );
    }
  });
  return Calendar;
});
