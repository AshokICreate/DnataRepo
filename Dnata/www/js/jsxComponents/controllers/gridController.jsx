define(function (require) {

  var NavigationActions = require ("actions/navigationActions");
  var grid = React.createClass({

    getInitialState:function()
    {
      return {key:0};
    },
    _onClick: function (key) {
        this.setState({key:key});

        var currentItem = this.state.items[key];
        var content =  <Form id={currentItem} />;
        var rightButtonName = "Submit";
        var leftButtonName = "Back";

        var controllerData = {
          title:currentItem,
          content:content,
          rightButtonName:rightButtonName,
          leftButtonName:leftButtonName
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
