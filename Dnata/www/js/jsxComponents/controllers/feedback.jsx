define(function(require){
  var NavigationActions = require ("actions/navigationActions");
  var NavigationStore = require ("stores/navigationStore");
  var NavigationConstants = require ("constants/navigationConstants");
  var appActions = require ("actions/appActions");

  var TextArea = require("views/textareaBox");
  var TextBox = require("views/textBox");
  var ToggleButton =  require ("views/toggleButton");
  var SelectBox = require ("views/selectBox");
  var Select = require("controllers/select");
  var Msg = require("views/msgBox");
  var msgButtonsArray = [{"title":"ok"}];

  var feedbackObj = {
    feedback_title:"",
    primary_location:"",
    receive_update:"2",
    feedback_name:"",
    company_name:"",
    email_address:"",
    contact_number:""
  }

  var countries = [
                    {"key":"AUS", "value":"Australia"},
                    {"key":"EBL", "value":"Iraq"},
                    {"key":"MNL", "value":"Philippines"},
                    {"key":"SIN", "value":"Singapore"},
                    {"key":"GVA", "value":"Switzerland Geneva"},
                    {"key":"ZRH", "value":"Switzerland Zurich"},
                    {"key":"UAE", "value":"United Arab Emirates"},
                    {"key":"UK", "value":"United Kingdom"},

                  ]
  var feedback = React.createClass({

  getInitialState: function () {
    var isReceiveUpdate;
    if(feedbackObj.receive_update === "2")
    {
      isReceiveUpdate = false;
    }
    else
    {
      isReceiveUpdate = true;
    }
    return {value:isReceiveUpdate};
  },
  componentDidMount: function () {
      NavigationStore.addChangeListener (NavigationConstants.Right_Click_Event,this._onSubmit);
  },
  componentWillUnmount: function () {
      NavigationStore.removeChangeListener (NavigationConstants.Right_Click_Event,this._onSubmit);
  },
  _onCancel:function() {
    NavigationActions.removePopup();
  },
  _onSuccess:function()
  {
      appActions.reInitiateApp();
  },
  _onError:function()
  {

  },
  _sendToServer:function()
  {
      var localObject = feedbackObj.primary_location;
      feedbackObj.primary_location = localObject.key;

      var qParams = getQueryParams(feedbackObj);

      $.ajax({
        type            : "POST", //GET or POST or PUT or DELETE verb
        url             : "http://172.27.138.47/metricstream/feedbak?"+qParams, // Location of the service
        data            : "", //Data sent to server
        contentType     : "application/json", // content type sent to server
        dataType        : "JSON",
        success         : this._onSuccess,
        error						: this._onError,
      })

      feedbackObj = {
        feedback_title:"",
        primary_location:"",
        receive_update:"2",
        feedback_name:"",
        company_name:"",
        email_address:"",
        contact_number:""
      }
      NavigationActions.presentPopup(<Msg msgLabel={"submission_success"} buttons={msgButtonsArray} onMsgClick={this._onSubmitSuccess}/>);

  },
  _onSubmitSuccess: function() {
    NavigationActions.removePopup();
    appActions.reInitiateApp();
  },
  _onSubmit:function()
  {
    // console.log("Feedback submitted");
    var isEmpty = false;
    if(!feedbackObj.feedback_title || !feedbackObj.primary_location || !feedbackObj.receive_update )
    {
      isEmpty = true;
    }
    if(feedbackObj.receive_update === "1")
    {
      if(!feedbackObj.feedback_name || !feedbackObj.email_address || !feedbackObj.contact_number)
      {
        isEmpty = true;
      }
    }

    if(isEmpty)
    {
      NavigationActions.presentPopup(<Msg msgLabel={"mandatory_field"} buttons={msgButtonsArray} onMsgClick={this._onCancel}/>);
      return;
    }else {
        this._sendToServer();
    }

  },
  _onSave: function(id,value) {
    console.log("id and value are "+id,value);
    feedbackObj[id] = value;
    if(id === "receive_update" )
    {
        var isReceiveUpdate = false;

        if(feedbackObj["receive_update"] === "1")
        {
         isReceiveUpdate = true;
       }else {
         feedbackObj.feedback_name = "";
         feedbackObj.company_name = "";
         feedbackObj.email_address = "";
         feedbackObj.contact_number = "";
       }
        this.setState({value:isReceiveUpdate});
    }
    else if(id === "email_address")
    {
      var email = feedbackObj.email_address;
      var atpos = email.indexOf("@");
      var dotpos = email.lastIndexOf(".");
      if (atpos <1 || dotpos <atpos+2 || dotpos+2 >= email.length)
      {
        NavigationActions.presentPopup(<Msg msgLabel={"invalid_email"} buttons={msgButtonsArray} onMsgClick={this._onCancel}/>);
      }
    }
    else if(id === "contact_number")
    {
        var number = feedbackObj.contact_number;
        if(isNaN(number) || number.indexOf(" ")!=-1)
        {
          NavigationActions.presentPopup(<Msg msgLabel={"invalid_contact"} buttons={msgButtonsArray} onMsgClick={this._onCancel}/>);
        }
    }
  },

  _onSelect: function() {
    var isSingleSelect = true;
    var content= <Select options={countries} isSingleSelect={isSingleSelect} onSave={this._onSave} id={"primary_location"} />
    var controllerData = {
      title:getString("select"),
      content:content,
      leftButtonName:"Back",
      rightButtonName:"Submit"
    };
    NavigationActions.pushController(controllerData);

  },

  render: function () {
    var className = "hide";
    if(this.state.value)
    {
      className = "feedbackUserDetails";
    }
    return(
      <div className="gclass form">
        <TextArea name={"What feedback would you like to provide"} isRequired={true} onSave={this._onSave} id={"feedback_title"} defaultvalue={feedbackObj["feedback_title"]}/>
        <SelectBox name={"Where are you providing feedback for"} isRequired={true} onSelectBoxClick={this._onSelect} id={"primary_location"} defaultvalues={[feedbackObj["primary_location"]]}/>
        <ToggleButton name={"Would you like to receive a response to your feedback?"} isRequired={true} options={[{"key":"1","value":"Yes"},{"key":"2","value":"No"}]} id={"receive_update"} onSave={this._onSave} defaultvalue={feedbackObj["receive_update"]}/>
        <div className={className}>
          <TextBox name={"Name"} isRequired={true} id={"feedback_name"} onSave={this._onSave} defaultvalue={feedbackObj["feedback_name"]}/>
          <TextBox name={"Company name"} id={"company_name"} onSave={this._onSave} defaultvalue={feedbackObj["company_name"]}/>
          <TextBox name={"Email"} isRequired={true} id={"email_address"} onSave={this._onSave} defaultvalue={feedbackObj["email_address"]} />
          <TextBox name={"Contact number"} isRequired={true} id={"contact_number"} onSave={this._onSave} defaultvalue={feedbackObj["contact_number"]} />
        </div>
      </div>
        );
      }
  });
  return feedback;

  function getQueryParams(object)
  {
      var queryString="";
      for (var key in object)
      {
          if(object[key])
          {
            if(queryString)
            {
                queryString = queryString + "&";
            }
            queryString = queryString + key + "=" +object[key];
          }
      }

      return encodeURI(queryString);
  }

});
