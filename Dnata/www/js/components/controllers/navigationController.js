define(function (require) {
  var Back = require("views/back");
  var Header = require("views/header");
  var NavigationStore = require("stores/navigationStore");
  var NavigationActions = require ("actions/navigationActions");

  function getState () {
      return {
          controller: NavigationStore.getController()
      };
  }

  var navigator = React.createClass({displayName: "navigator",
    getInitialState: function () {
        return {controller:this.props.controller};
    },
    componentDidMount: function () {
        NavigationStore.addChangeListener (this._onChange);
    },
    componentWillUnmount: function () {
        NavigationStore.removeChangeListener (this._onChange);
    },
    componentWillReceiveProps: function(nextProps) {
      //NavigationActions.clearControllers(); try changing root controller
      this.setState({
        controller:nextProps.controller
      });
    },
    _onChange: function () {
        this.setState (getState());
    },
    render:function()
    {

      var controller;

      if(this.state.controller)
      {
          var leftButton;
          var rightButton;
          if(this.state.controller.leftButton)
          {
              leftButton = this.state.controller.leftButton;

          }else if(this.state.controller.backButtonName)
          {
              leftButton = React.createElement(Back, {name: this.state.controller.backButtonName});
          }

          if(this.state.controller.rightButton)
          {
              rightButton = this.state.controller.rightButton;
          }

          var title = this.state.controller.title ? this.state.controller.title:"";
          controller = React.createElement("div", {className: "gclass"}, 
                      leftButton, 
                      React.createElement(Header, {name: title}), 
                      rightButton, 
                      React.createElement("div", {className: "controller"}, 
                        this.state.controller.content
                      )
                    );
      }

      return(
        React.createElement("div", {className: "container"}, 
          controller
        )
      );

    }

  });

  return navigator;
});
