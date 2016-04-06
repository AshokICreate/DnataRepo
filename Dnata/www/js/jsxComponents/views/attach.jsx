define(function (require) {

  var attach = React.createClass({

    getInitialState: function() {
      return { fadevalue: false, images:[]};
    },

  _onAttach: function() {
    this.setState({fadevalue: true});
  },

  _onCancel: function() {
    this.setState({fadevalue: false});
  },


  _capturePhoto: function() {
    // Take picture using device camera and retrieve image as base64-encoded string
     navigator.camera.getPicture(this.onSuccess, this.onFail, { quality: 50,
       destinationType: navigator.camera.DestinationType.DATA_URL,
       cameraDirection:navigator.camera.Direction.BACK});
  },

  onSuccess: function(imgData) {
    //onSuccess
    console.log("Capture success");
    // var smallImage = document.getElementById('smallImage');
    // smallImage.style.display = 'block';
    // smallImage.src = "data:image/jpeg;base64," + imageData;
     var array = this.state.images;
     array.push(imgData);
     this.setState({fadevalue:false});
  },

  _uploadPhoto: function() {
     navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    console.log("upload photo is clicked");
  },

  onPhotoURISuccess: function(imgURI) {
    //onSuccess
    console.log("Album success");
    var array = this.state.images;
    array.push(imgURI);
    this.setState({fadevalue:false, images: array});
  },


  onFail: function(msg) {
    console.log("Failed because: " + msg);
  },

  render: function() {
    var classname = "filler hide";
    if(this.state.fadevalue){
      classname = "filler";
    }

    var divsToAttach=[];
    for(var i=0;i<this.state.images.length;i++)
    {
      var srctoimage = this.state.images[i];
      divsToAttach.push(<img className="attachimg" key={i} id="uploadimg" src={srctoimage}/>);
    }
    return(
    <div className="attachment">
     <span className="label">Attachments</span>
     <div className="attachmentholder">
        {divsToAttach}
       <div className="attach icon-Add" onClick={this._onAttach}></div>
       <div className={classname}>
         <div className="attachbox">
           <div className="cancel" onClick={this._onCancel}>✕</div>
           <div className="capture" onClick={this._capturePhoto}>
             <div className="attachicon import-Capture"></div>
             <div className="attachtext">Capture Document</div>
           </div>
           <div className="divider"></div>
           <div className="capture" onClick={this._uploadPhoto}>
             <div className="attachicon import-Picture"></div>
             <div className="attachtext">Upload Picture</div>
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
