define(function(require) {

  var SelectList = require('views/selectList');
  var Button = require('views/button');
  var select = React.createClass ({

  propTypes:{
      onSave: React.PropTypes.func.isRequired,
      options: React.PropTypes.array.isRequired,
      isSingleSelect: React.PropTypes.bool.isRequired
  },

  selectedValue: function(selvalue){
    this.props.onSave(selvalue);
  },

  render: function () {
      var array = this.props.options;
      return(
        <SelectList options={array} onSelected={this.selectedValue} isSingle={this.props.isSingleSelect}/>
        );
      }
      });
  return select;
});
