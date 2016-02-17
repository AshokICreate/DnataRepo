define(function (require) {

  var grid = React.createClass({displayName: "grid",

    getInitialState:function()
    {
      return {key:0};
    },
    _onClick: function (key) {
        this.setState({key:key});
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
          return (React.createElement("div", {key: i, className: className, onClick: that._onClick.bind(that, i)}, 
              React.createElement("div", {className: "gridIcon"}), 
              React.createElement("div", {className: "gridName"}, getString(name))
          ))
        });

        return content;
    },
    render:function() {

      var content = this.getContent();

      return(
          React.createElement("div", {className: "gridContainer"}, 
            content
          )
      );

    }

  });

  return grid;


});
