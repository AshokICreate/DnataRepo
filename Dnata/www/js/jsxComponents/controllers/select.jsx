define(function(require) {

  var SelectList = require('views/selectList');
  var Button = require('views/button');
  var array = ["1","2","3"];

  var select = React.createClass ({

  propTypes:{
      onSave: React.PropTypes.func.isRequired
  },

  selectedValue: function(selvalue){
    this.props.onSave(selvalue);
  },

  render: function () {
      return(
        <SelectList options={array} onSelected={this.selectedValue} isSingle={false}/>
        );
      }
      });
  return select;
});
