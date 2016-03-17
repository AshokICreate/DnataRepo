define(function(require){

  var  Calendar = React.createClass({

    propTypes: {
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
      defaultvalue:React.PropTypes.string,
      onSave: React.PropTypes.func.isRequired
    },

    _handleChange: function(event) {
      this.props.onSave(this.props.id, event.target.value);
    },

    render: function() {
      var name = this.props.name;
      var className = "field";

      return(
        <div className="inputBox">
          <div className="label">{getString(name)}</div>
          <input type="date" className={className} id="cdate" onChange={this._handleChange} defaultValue={this.props.defaultvalue}/>
        </div>
      );
    }
  });
  return Calendar;
});
