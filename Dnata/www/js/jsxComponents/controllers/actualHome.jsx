define(function(require){

  var Store = require('stores/homeStore');

var actualhome = React.createClass({

  getContent: function () {
   var contentItems = Store.getActualInjuryFormItems();
   var content = [];
   for (var i=0;i<contentItems.length;i++){
     var eachItem = contentItems[i];
     var className = "actualItem";
     var iconClass = "actualIcon icon-"+eachItem;
     content.push
     (
       <div key={i} className={className}>
         <div className={iconClass}> </div>
         <div className="actualName">{getString(eachItem)}</div>
       </div>
     );
   }
   return content;
},

  render: function(){

    var content = this.getContent();
    return(
      <div className="gclass">
        <div className="navigationBar">
          <div className="headerContainer">
            <div className="title">Actual Injury</div>
          </div>
        </div>
        <div className="actualcontroller">
         {content}
        </div>
      </div>
    );

  }
});
return actualhome;
});
