define(function(require){
  var TextLabel = require("views/textLabel");
  var NavigationActions = require ("actions/navigationActions");
  var Msg = require("views/msgBox");
  var  Calendar = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool.isRequired,
    defaultdate:React.PropTypes.string,
    defaulttime:React.PropTypes.string,
    onSave: React.PropTypes.func.isRequired
  },

  getInitialState: function(){

    return ({date:this.props.defaultdate,time:this.props.defaulttime});
  },

  componentDidMount: function () {

    var date = Moment(this.props.defaultdate,"YYYY-MM-DD").format("M/DD/YYYY");
    var time = Moment(this.props.defaulttime, 'HH:mm').format('HH:mm:ss');
    this.props.onSave(this.props.id,date+" "+time);
  },
  componentWillReceiveProps:function(nextProps) {
      this.setState({date:nextProps.defaultdate,time:nextProps.defaulttime});
  },
  validateDateAndTime: function(date,time){
    var currentDate = Moment().format("YYYY-MM-DD HH:mm");
    if((Moment(currentDate).isAfter(date+" "+time)))
    {
        var dateValue = Moment(date,"YYYY-MM-DD").format("M/DD/YYYY");
        var timeValue = Moment(time, 'HH:mm').format('HH:mm:ss');
        this.props.onSave(this.props.id,dateValue+" "+timeValue);
        this.setState({date:date,time:time});

    }else {
        var msgButton = [{"title":"ok"}];
        NavigationActions.presentPopup(<Msg msgLabel={"invalid_date"} buttons={msgButton} onMsgClick={this._onCancel}/>);

        //Not resetting to current date
        var dateValue = Moment().format("YYYY-MM-DD");
        var timeValue = Moment().format("HH:mm");
        this.setState({date:dateValue,time:timeValue});

        var dateAndTime =  Moment().format("M/DD/YYYY HH:mm:ss");
        this.props.onSave(this.props.id,dateAndTime);
    }

  },

  _handleDate: function(event){
      var dateValue = event.target.value;
      this.validateDateAndTime(dateValue,this.state.time);
  },
  _handleTime: function(event){
      var timeValue = event.target.value;
      this.validateDateAndTime(this.state.date,timeValue);
  },

 _onCancel: function(){
    NavigationActions.removePopup();
 },
  render: function() {
    var name = this.props.name;
    var className = "cfield";

    return(
      <div className="inputBox">
        <TextLabel name={this.props.name} isRequired={this.props.isRequired}/>
        <input type="date" className={className+" date"+" icon-Calender"} id="cdate" onChange={this._handleDate} defaultValue={this.state.date}/>
        <input type="time" className={className+" time"+" icon-Clock-01"} id="ctime" onChange={this._handleTime} defaultValue={this.state.time}/>
      </div>
      );
    }
  });
return Calendar;
});
