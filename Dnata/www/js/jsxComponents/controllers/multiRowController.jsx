define(function(require){

  var MultiRow = React.createClass({


    getInitialState: function(){

      return { activeTab:0,tabsArray:["Row1"]};
    },

    _onButtonSelect: function (index) {
      this.setState({ activeTab:index,tabsArray:this.state.tabsArray});
    },

    addNewTab:function(e){
      e.preventDefault();
      var noofTabsinScreen = this.state.tabsArray.length+1;
      var row = "Row "+noofTabsinScreen

      var array = this.state.tabsArray;
      array.push(row);
      this.setState({ activeTab:this.state.activeTab,tabsArray:array});
    },

    onCancelButton:function(index){
      var array = this.state.tabsArray;
      array.splice(index,1);
      this.setState({ activeTab:this.state.activeTab,tabsArray:array});
    },

    render: function(){
      var divsToArrange = [];
      //That means to be not deleted
      var length = this.state.tabsArray.length;
      for(var i=0;i<length;i++){
          var cssName = "tab unselected";

          if(this.state.activeTab == i){
            cssName = "tab selected";
          }

          var crossDiv = <div className="closediv"  onClick={this.onCancelButton.bind(this,i)}>X</div>;

          if(i==0)
          {
            crossDiv="";
          }
          divsToArrange.push(
            <div  className={cssName} onClick={this._onButtonSelect.bind(this,i)}>
              <div>{this.state.tabsArray[i]}</div>
              {crossDiv}
            </div>
          );
        }

      return(
        <div className="tab_container">
          {divsToArrange}
          <div className="plus_tab" onClick={this.addNewTab}>+</div>
          <div className="tabViewContainer"></div>

        </div>




      );
    }

  });
  return MultiRow;
});
