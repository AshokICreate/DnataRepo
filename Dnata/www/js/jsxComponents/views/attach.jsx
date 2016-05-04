define(function (require) {
  var TextLabel = require("views/textLabel");
  var serverCall = require ("util/serverCall");
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
       destinationType: navigator.camera.DestinationType.DATA_URL,encodingType: Camera.EncodingType.JPEG,
       targetWidth: 720,cameraDirection:navigator.camera.Direction.BACK});
  },

  onSuccess: function(imgURI) {
    //onSuccess
    uplaod(imgURI);
     console.log("Photo captured successfully");
     var array = this.state.images;
     array.push(imgURI);
     this.setState({fadevalue:false,images:array});
  },

  _uploadPhoto: function() {
     navigator.camera.getPicture(this.onSuccess, this.onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    console.log("upload photo is clicked");
  },

  onFail: function(msg) {

    console.log("Failed because: " + msg);


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
      var srctoimage = "data:image/jpeg;base64," +this.state.images[i];
      divsToAttach.push(<img className="attachimg" key={i} id="uploadimg" src={srctoimage}/>);
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

  function createdTask(file)
  {
      console.log(file);
  }
  function uplaod(fileData)
  {

      var obj ={
        "filename": "attach.jpg",
        "description": "sample",
        "content": fileData,
        "mimetype": "39"
      }
      var data = JSON.stringify(obj);
      serverCall.connectServer("POST","documents",data,createdTask);

  }
});
