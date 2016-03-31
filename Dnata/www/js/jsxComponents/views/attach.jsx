define(function (require) {

  var attach = React.createClass({

    getInitialState: function() {
      var val = false;
      return { value: val};
    },

  _onAttach: function() {
    var val = true;
    this.setState({value: val});
  },

  render: function() {
    var flag = this.state.value;
    var classname = "filler hide";
    if(flag){
      classname = "filler";
    }
  return(
    <div className="attachment">
     <span className="label">Attachments</span>
     <div className="attach icon-Add" onClick={this._onAttach}></div>
     <div className={classname}>
      <div className="attachbox">
        <div className="cancel">✕</div>
        <div className="capture" >
          <div className="attachicon"></div>
          <div className="attachtext">Capture Document</div>
        </div>
        <div className="capture">
          <div className="attachicon"></div>
          <div className="attachtext">Upload Picture</div>
        </div>
        <div className="capture">
          <div className="attachicon"></div>
          <div className="attachtext">Upload Document</div>
        </div>
      </div>
     </div>
   </div>
      );
    }
  });
  return attach;
});
