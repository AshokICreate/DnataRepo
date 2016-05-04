define(function (require) {
  var NavigationActions = require ("actions/navigationActions");
  var TextLabel = require("views/textLabel");
  var Msg = require("views/msgBox");
  var msgButtonsArray;
  var attach = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool.isRequired
  },

    getInitialState: function() {
      return { fadevalue: false, images:[]};
    },

  _onAttach: function() {
    this.setState({fadevalue: true,images:this.state.images});
  },

  _onCancel: function() {
    this.setState({fadevalue: false,images:this.state.images});
  },


  _capturePhoto: function() {
    // Take picture using device camera and retrieve image as base64-encoded string
     navigator.camera.getPicture(this.onSuccess, this.onFail, { quality: 50,
       destinationType: navigator.camera.DestinationType.FILE_URI,encodingType: Camera.EncodingType.JPEG,
       targetWidth: 720,cameraDirection:navigator.camera.Direction.BACK});
  },

  onSuccess: function(imgData) {
     var array = this.state.images;
     array.push(imgData);
     this.setState({fadevalue:false,images:array});
  },

  _uploadPhoto: function() {
     navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
  },

  onPhotoURISuccess: function(imgURI) {
    var array = this.state.images;
    array.push(imgURI);
    this.setState({fadevalue:false, images: array});
  },

  _onDelete: function(){
    msgButtonsArray = [{"title":"yes"},{"title":"no"}];
    NavigationActions.presentPopup(<Msg msgLabel={"delete_attachment"} buttons={msgButtonsArray} onMsgClick={this._onDeleteAttachment} />);
  },

  onFail: function(msg) {
    msgButtonsArray = [{"title":"ok"}];
    NavigationActions.presentPopup(<Msg msgLabel={"failed_attachment"} buttons={msgButtonsArray} onMsgClick={this._onDeleteAttachment} />);
  },

  _onDeleteAttachment: function(title){
      if(title==="yes"){
          NavigationActions.removePopup();
          var array = this.state.images;
          array.pop();
          this.setState({fadevalue:false, images:array});
      }
      else if(title==="no" || title==="ok"){
          NavigationActions.removePopup();
      }
  },

  render: function() {
    var classname = "filler hide";

    if(this.state.fadevalue)
    {
      classname = "filler";
    }

    var divsToAttach=[];
    for(var i=0;i<this.state.images.length;i++)
    {
      var srctoimage = this.state.images[i];
      divsToAttach.push(
          <img className="attachimg" key={i} id="uploadimg" src={srctoimage} onClick={this._onDelete}/>
      );
    }
    return(
    <div className="attachment">
       <TextLabel name={this.props.name} isRequired={this.props.isRequired}/>
       <div className="attachmentholder">
          {divsToAttach}
          <div className="attach icon-Add" onClick={this._onAttach}></div>
          <div className={classname}>
            <div className="attachbox">
              <div className="cancel" onClick={this._onCancel}>✕</div>
              <div className="capture" onClick={this._capturePhoto}>
                 <div className="attachicon import-Capture"></div>
                 <div className="attachtext">Capture</div>
              </div>
              <div className="divider"></div>
              <div className="capture" onClick={this._uploadPhoto}>
                 <div className="attachicon import-Picture"></div>
                 <div className="attachtext">Upload</div>
              </div>
            </div>
          </div>
      </div>
    </div>
      );
    }
  });
  return attach;
});
