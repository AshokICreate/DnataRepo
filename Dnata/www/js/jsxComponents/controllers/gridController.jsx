define(function (require) {

  var NavigationActions = require ("actions/navigationActions");
  var Form = require ("controllers/form");
  var NavigationStore = require ("stores/navigationStore");
  var NavigationConstants = require ("constants/navigationConstants");

  var grid = React.createClass({

    getInitialState:function()
    {
        var state = NavigationStore.getControllerState();

        if(!state)
          state = [];

        return {itemsSelected:state};
    },
    componentDidMount: function () {
        NavigationStore.addChangeListener (NavigationConstants.Right_Click_Event,this._onNext);
    },
    componentWillUnmount: function () {
        NavigationStore.removeChangeListener (NavigationConstants.Right_Click_Event,this._onNext);
    },
    _onNext:function()
    {
        var state = this.state.itemsSelected;
        var selectedValue = "";
        for(var i = 0;i<state.length;i++)
        {
            var index = this.props.items.indexOf(state[i])+1;
            //manipulation as server values for lov are from 1 - 7 and 10
            if(index === 8 )
            {
              index = 10;
            }
            if(i===0)
              selectedValue = selectedValue + index;
            else {
              selectedValue = selectedValue +";"+index;
            }
        }

        var content =  <Form id={this.props.id} potentialLov={selectedValue}/>;
        var rightButtonName = "Submit";
        var leftButtonName = "Back";

        var controllerData = {
          title:this.props.id,
          content:content,
          rightButtonName:"Submit",
          leftButtonName:"Back"
        };


        NavigationActions.pushController(controllerData,state);
    },
    _onClick: function (key) {

        var itemsSelected = this.state.itemsSelected;
        var index = itemsSelected.indexOf(key);

        if(index>-1)
        {
          itemsSelected.splice(index,1)
        }else {
          itemsSelected.push(key)
        }
        this.setState({itemsSelected:itemsSelected});

    },
    getContent:function(){

        var that =this;
        var itemsSelected = this.state.itemsSelected;
        var content = this.props.items.map(function(name,i)
        {
          var className= "gridItem";
          var index = itemsSelected.indexOf(name);
          if(index>-1)
          {
            className= "gridItem highlight"
          }
          var iconClass = "gridIcon icon-"+name;
          return (<div key={i} className={className} onClick={that._onClick.bind(that, name)}>
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
