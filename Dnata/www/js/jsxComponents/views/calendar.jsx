define(function(require){

  var  Calendar = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
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
    var className = "cfield image-Calender";

    return(
      <div className="inputBox">
        <div className="label">{getString(name)}</div>
          <input type="date" className={className} id="cdate" onChange={this._handleDate} defaultValue={this.props.defaultdate}/>
          <input type="time" className={className+" time"} id="ctime" onChange={this._handleTime} defaultValue={this.props.defaulttime}/>
      </div>
      );
    }
  });
return Calendar;
});
