define(function (require) {
  var actions = require ("actions/formActions");
  var Store = require ("stores/formStore");
  var constants = require ("constants/formConstants");
  var TextBox =  require ("views/textBox");
  var ToggleButton =  require ("views/toggleButton");
  var RadioGroup = require ("views/radioGroup");
  var CheckGroup = require ("views/checkGroup");
  var SelectBox = require ("views/selectBox");
  var Select = require ("controllers/select");
  var NavigationActions = require ("actions/navigationActions");

  var form = React.createClass ({
      getInitialState: function () {
          return this.getContent(this.props.id);
      },
      componentDidMount: function () {
          Store.addChangeListener (constants.Change_Data_Event,this._onChange);
      },
      componentWillUnmount: function () {
          Store.removeChangeListener (constants.Change_Data_Event,this._onChange);
      },
      render: function () {
          var content = this.state.content;
          return (
              <div className="gclass form">
                {content}
              </div>
          );
      },
      _onChange:function()
      {
          return this.setState(this.getContent(this.props.id));
      },
      _onSelectBoxClick:function(key,options)
      {
          var content;
          var isSingleSelect = true;
          var formsData = Store.getData();
          var structure = formsData[this.props.id].data.structure
          var resources = formsData[this.props.id].data.resources
          var element = structure[key];
          if("multiple" === element.select )
          {
              isSingleSelect =false;
          }

          if(element.resource.source==="form")
          {
              var options = getValuesOfResource(resources[element.resource.ref]);
              content= <Select options={options} isSingleSelect={isSingleSelect} id={key} key={key}/>
              var controllerData = {
                title:getString("select"),
                content:content,
                backButtonName:"back"
              };
              NavigationActions.pushController(controllerData);
          }else {

              var parameters = element.resource.parameters;
              var queryParams;
              for(var i=0;i<parameters.length;i++)
              {
                  var obj = parameters[i];
                  if(i==0)
                  {
                      queryParams=obj.ref+"="+obj.value;
                  }
                  else {
                      queryParams = queryParams +"&"+obj.ref+"="+obj.value
                  }
              }
              var url  = "tasks/"+formsData[this.props.id].assignmentId+"/form/resources/"+element.resource.ref+"?"+queryParams;

              var gotResourceData=function(data)
              {
                  var options = getValuesOfResource(data);
                  content= <Select options={options} isSingleSelect={isSingleSelect} id={key} key={key}/>
                  var controllerData = {
                    title:getString("select"),
                    content:content,
                    backButtonName:"<"
                  };
                  NavigationActions.pushController(controllerData);
              }

              Store.getResorceData(url,gotResourceData);
          }
      },
      getContent:function (id)
      {
          var formsData = Store.getData();
          if(formsData && formsData[id])
          {

            return this.renderUI(formsData[id].data,Store.getKeysToShow(id))
          }

          actions.getFormData(id);
          return {content:"loader"};
      },
      renderUI:function(data,keys)
      {
          var structure = data.structure;
          var content = [];
          for(var i=0;i<keys.length;i++)
          {
              var key = keys[i];
              var element = structure[key];

              switch (element.fieldtype) {
                case constants.Popup:
                case constants.Dropdown:
                {
                    if(element.resource.source==="form")
                    {
                        var values = getValuesOfResource(data.resources[element.resource.ref]);
                        var isSingleSelect = true;
                        if("multiple" === element.select )
                        {
                            isSingleSelect = false;
                        }

                        if(values.length==2 && isSingleSelect)
                        {
                            content.push(<ToggleButton name={element.label} options={values} id={key} key={key}/>)

                        }else if (values.length < 5) {
                            if(isSingleSelect)
                            {
                                content.push(<RadioGroup name={element.label} options={values} id={key} key={key}/>)
                            }else {
                                content.push(<CheckGroup name={element.label} options={values} id={key} key={key}/>)
                            }
                        }else {
                            content.push(<SelectBox name={element.label} onSelectBoxClick={this._onSelectBoxClick} id={key} key={key}/>);
                        }
                    }else {
                        content.push(<SelectBox name={element.label} onSelectBoxClick={this._onSelectBoxClick} id={key} key={key}/>);
                    }
                    break;
                }
                case constants.Calendar:
                {
                    break;
                }

                case constants.Attachment:
                {
                    break;
                }
                default:
                {
                    content.push(<TextBox name={element.label} id={key}  key={key}/>)
                }
              }
          }

          return {content:content};
      }
  });
  return form;

  function getValuesOfResource(resourceData) {
      var values= [];
      for (var key in resourceData) {
        var value = resourceData[key].value;
        values.push(value);
      }

      return values;
  }

});
