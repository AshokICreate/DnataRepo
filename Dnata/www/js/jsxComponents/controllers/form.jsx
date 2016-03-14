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
      _onComponentSave:function(id,value)
      {
          if(value)
          {
              var formsData = Store.getData();
              var content = formsData[this.props.id].data.content;

              if(value instanceof Array)
              {
                  var arrayObj = []
                  for (var i=0;i<value.length;i++)
                  {
                      if(value[i] && value[i] !== "")
                      {
                          var obj = {value:value[i]};
                          arrayObj.push(obj);
                      }
                  }
                  content[id] = arrayObj;

              }else if(value !== "")
              {
                  var obj = {value:value};
                  content[id] = obj;
              }
          }

      },
      _onSelectBoxClick:function(key,options)
      {
          var content;
          var isSingleSelect = true;
          var formsData = Store.getData();
          var structure = formsData[this.props.id].data.structure;
          var resources = formsData[this.props.id].data.resources;
          var content = formsData[this.props.id].data.content;
          var element = structure[key];
          if("multiple" === element.select )
          {
              isSingleSelect =false;
          }

          var obj = content[key];
          var defaultArray= [];
          if(obj instanceof Array)
          {
              value = [];
              for(var index=0;index<obj.length;index++)
              {
                  if( obj[index].value && obj[index].value!=="")
                    defaultArray.push( obj[index].value);
              }
          }else {
              if(obj.value && obj.value!=="")
                defaultArray.push( obj.value)
          }

          if(element.resource.source==="form")
          {
              var options = getValuesOfResource(resources[element.resource.ref]);
              content= <Select options={options} isSingleSelect={isSingleSelect} onSave={this._onComponentSave} defaultvalues={defaultArray} id={key} key={key}/>
              var controllerData = {
                title:getString("select"),
                content:content,
                backButtonName:"back",
                rightButtonName:"submit"
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

              var that = this;
              var gotResourceData=function(data)
              {
                  var options = getValuesOfResource(data);
                  content= <Select options={options} isSingleSelect={isSingleSelect} onSave={that._onComponentSave} defaultvalues={defaultArray} id={key} key={key}/>
                  var controllerData = {
                    title:getString("Select"),
                    content:content,
                    backButtonName:"back",
                    rightButtonName:"submit"
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
          var content = data.content;
          var contentUI = [];
          for(var i=0;i<keys.length;i++)
          {
              var key = keys[i];
              var element = structure[key];
              var obj = content[key];
              var value;
              if(obj instanceof Array)
              {
                  value = [];
                  for(var index=0;index<obj.length;index++)
                  {
                      if(obj[index].value && obj[index].value!=="")
                        value.push(obj[index].value);
                  }
              }else {
                  if(obj.value)
                    value = obj.value;
                  else {
                    value = "";
                  }
              }

              switch (element.fieldtype) {
                case constants.Popup:
                case constants.Dropdown:
                {
                    var isSingleSelect = true;
                    if("multiple" === element.select )
                    {
                        isSingleSelect = false;
                    }

                    if(element.resource.source==="form")
                    {
                        var options = getValuesOfResource(data.resources[element.resource.ref]);

                        if(options.length==2 && isSingleSelect)
                        {
                            contentUI.push(<ToggleButton name={element.label} options={options} onSave={this._onComponentSave} defaultvalue={value} id={key} key={key}/>)

                        }else if (options.length < 5) {
                            if(isSingleSelect)
                            {
                                contentUI.push(<RadioGroup name={element.label} options={options} onSave={this._onComponentSave} defaultchecked={value} id={key} key={key}/>)
                            }else {
                                contentUI.push(<CheckGroup name={element.label} options={options} onSave={this._onComponentSave} defaultchecked={value} id={key} key={key}/>)
                            }
                        }else {
                            var defaultArray;
                            if(value instanceof Array)
                            {
                                defaultArray = value;
                            }else {
                                defaultArray = [];
                                if(value!=="")
                                  defaultArray.push(value);
                            }
                            contentUI.push(<SelectBox name={element.label} onSelectBoxClick={this._onSelectBoxClick} defaultvalues={defaultArray} id={key} key={key}/>);
                        }
                    }else {

                        var defaultArray;
                        if(value instanceof Array)
                        {
                            defaultArray = value;
                        }else {
                            defaultArray = [];
                            if(value!=="")
                              defaultArray.push(value);
                        }

                        contentUI.push(<SelectBox name={element.label} onSelectBoxClick={this._onSelectBoxClick} defaultvalues={defaultArray} id={key} key={key}/>);
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
                    contentUI.push(<TextBox name={element.label} onSave={this._onComponentSave} defaultvalue={value} id={key}  key={key}/>)
                }
              }
          }

          return {content:contentUI};
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
