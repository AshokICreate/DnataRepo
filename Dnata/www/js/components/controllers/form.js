define(function (require) {
  var actions = require ("actions/formActions");
  var Store = require ("stores/formStore");

  var form = React.createClass ({displayName: "form",
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

      },
      render: function () {
          var content = this.state.content;
          return (
              React.createElement("div", {className: "gclass"}, 
                content
              )
          );
      }
  });
  return form;

  function getContent(id)
  {
      var formData = Store.data;
      if(formData[id])
      {
        return render(formData[id])
      }

      actions.getFormData(id);
      return {content:"loader"};
  }

  function render(data)
  {

  }

});
