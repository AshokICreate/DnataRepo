define(function (require) {
  var Store = require('stores/homeStore');
  var PotentialHome = require ("controllers/home");
  var ActualHome = require ("controllers/actualHome");
  var ACTUAL = 0;
  var POTENTIAL = 1;
  var FEEDBACK = 2;
  var dnatahome = React.createClass({

  _handleChange: function(key){
    console.log(key);
    switch(key){
      case ACTUAL:
      {
        //push <ActualHome />
        console.log("ACTUAL INJURY");
        break;
      }

      case POTENTIAL:
      {
        //push <PotentialHome />
        console.log("POTENTIAL INJURY");
        break;
      }

      case FEEDBACK:
      {
        console.log("FEEDBACK");
        break;
      }
      default:
      {
          console.log ("NO ACTION");
          return true;
      }
    }
  },

  getContent:function(){
     var contentItems = Store.getdnataHomeItems();
     var content = [];
     for (var i=0;i<contentItems.length;i++){
       var eachItem = contentItems[i];
       var className = "sectionEvenItem";
       if(i%2 !== 0)
       {
         className = "sectionOddItem";
       }
       var iconClass = "sectionIcon icon-"+eachItem;
       content.push(
            <div key={i} className={className} onClick={this._handleChange.bind(this, i)}>
              <div className={iconClass}> </div>
              <div className="sectionName" >{getString(eachItem)}</div>
            </div>
       );
     }
     return content;
  },

  render:function(){
    var content = this.getContent();
    return(
      <div className="gclass">
        <div className="navigationBar">
          <div className="headerContainer">
            <div className="title">Report Injury</div>
          </div>
        </div>
        <div className="homecontroller">
            {content}
        </div>
      </div>
      );
    }
  });
  return dnatahome;
});
