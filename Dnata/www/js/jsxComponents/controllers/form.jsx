define(function (require) {
  var actions = require ("actions/formActions");
  var Store = require ("stores/formStore");
  var constants = require ("constants/formConstants");
  var TextBox =  require ("views/textBox");
  var ToggleButton =  require ("views/toggleButton");
  var RadioGroup = require ("views/radioGroup");
  var CheckGroup = require ("views/checkGroup");

  var form = React.createClass ({
      getInitialState: function () {
          return getContent(this.props.id);
      },
      componentDidMount: function () {
          Store.addChangeListener (this._onChange);
      },
      componentWillUnmount: function () {
          Store.removeChangeListener (this._onChange);
      },
      _onChange:function()
      {
          return this.setState(getContent(this.props.id));
      },
      render: function () {
          var content = this.state.content;
          return (
              <div className="gclass form">
                {content}
              </div>
          );
      }
  });
  return form;

  function getContent(id)
  {
      var formsData = Store.getData();
      if(formsData && formsData[id])
      {

        return render(formsData[id].data,Store.getKeysToShow(id))
      }

      actions.getFormData(id);
      return {content:"loader"};
  }

  function render(data,keys)
  {
      var structure = data.structure;
      var content = [];
      for(var i=0;i<keys.length;i++)
      {
          var key = keys[i];
          var element = structure[key];

          switch (element.fieldtype) {
            case constants.POPUP:
            case constants.DROPDOWN:
            {
                if(element.resource.source==="form")
                {
                    var values = getValuesOfResource(data.resources,element.resource.ref);
                    var isSingleSelect = true;
                    if("multiple" === element.select )
                    {
                        isSingleSelect = false;
                    }

                    if(values.length==2 && isSingleSelect)
                    {
                        content.push(<ToggleButton names={values} id={key} key={key}/>)

                    }else if (values.length < 5) {
                        if(isSingleSelect)
                        {
                            content.push(<RadioGroup name={element.label} options={values} id={key} key={key}/>)
                        }else {
                            content.push(<CheckGroup name={element.label} options={values} id={key} key={key}/>)
                        }
                    }
                }
                break;
            }
            case constants.CALENDAR:
            {
                break;
            }

            case constants.ATTACHMENT:
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

  function getValuesOfResource(resources,refid) {
      var values= [];
      for (var key in resources[refid]) {
        var value = resources[refid][key];
        values.push(value);
      }

      return values;
  }

});
