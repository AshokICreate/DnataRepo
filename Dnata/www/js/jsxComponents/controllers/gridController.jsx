define(function (require) {

  var NavigationActions = require ("actions/navigationActions");
  var Form = require ("controllers/form");
  var MultiRowController = require ("controllers/multiRowController");
  var Store = require ("stores/formStore");
  
  var grid = React.createClass({

    getInitialState:function()
    {
      return {key:0};
    },
    _onNext:function()
    {
        var currentItem = this.props.items[this.state.key];
        var content =  <MultiRowController id={this.props.id} childId={currentItem} />;
        var rightButtonName = "Submit";
        var leftButtonName = "Back";

        var controllerData = {
          title:currentItem,
          content:content,
          rightButtonName:rightButtonName,
          backButtonName:leftButtonName
        };

        NavigationActions.pushController(controllerData);
    },
    _onClick: function (key) {
        this.setState({key:key});

        var currentItem = this.props.items[key];
        var content =  <Form id={this.props.id} onRightButtonClick={this._onNext}/>;
        var rightButtonName = "Next";
        var leftButtonName = "Back";

        var controllerData = {
          title:currentItem,
          content:content,
          rightButtonName:rightButtonName,
          backButtonName:leftButtonName
        };

        NavigationActions.pushController(controllerData);

    },
    getContent:function(){

        var that =this;
        var currentItem = this.state.key;
        var content = this.props.items.map(function(name,i)
        {
          var className= "gridItem";

          if(currentItem===i)
          {
            className= "gridItem highlight"
          }
          var iconClass = "gridIcon icon-"+name;
          return (<div key={i} className={className} onClick={that._onClick.bind(that, i)}>
              <div className={iconClass} />
              <div className="gridName" >{getString(name)}</div>
          </div>)
        });

        return content;
    },
    render:function() {

      var content = this.getContent();

      return(
          <div className="gridContainer">
            {content}
          </div>
      );

    }

  });

  return grid;


});
