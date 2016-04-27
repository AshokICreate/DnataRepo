define(function(require){
  var TextLabel = require("views/textLabel");
  var  Calendar = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool.isRequired,
    defaultdate:React.PropTypes.string,
    defaulttime:React.PropTypes.string,
    onSave: React.PropTypes.func.isRequired
  },

  date:"",
  time:"",

  componentDidMount: function () {

    this.date = this.props.defaultdate;
    this.time = this.props.defaulttime;
  },

  _handleDate: function(event){
      this.date = event.target.value;
      this.props.onSave(this.props.id,this.date+" "+this.time);
  },

  _handleTime: function(event){
      this.time = event.target.value;
      this.props.onSave(this.props.id,this.date+" "+this.time);
  },

  render: function() {
    var name = this.props.name;
    var className = "cfield";

    return(
      <div className="inputBox">
        <TextLabel name={this.props.name} isRequired={this.props.isRequired}/>
        <input type="date" className={className+" date"+" image-Calender"} id="cdate" onChange={this._handleDate} defaultValue={this.props.defaultdate}/>
        <input type="time" className={className+" time"+" image-Clock-01"} id="ctime" onChange={this._handleTime} defaultValue={this.props.defaulttime}/>
      </div>
      );
    }
  });
return Calendar;
});
