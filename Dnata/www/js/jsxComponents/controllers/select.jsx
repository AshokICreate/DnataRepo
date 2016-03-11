define(function(require) {

  var SelectList = require('views/selectList');
  var Button = require('views/button');

  var select = React.createClass ({

    propTypes:{
        id: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        defaultvalue: React.PropTypes.array,
        isSingleSelect: React.PropTypes.bool.isRequired,
        onSave: React.PropTypes.func.isRequired
    },

    selectedValue: function(selvalue){
      this.props.onSave(this.props.id,selvalue);
    },

    render: function() {
        return(
          <SelectList options={this.props.options} defaultvalue={this.props.defaultvalue} onSelected={this.selectedValue} isSingle={this.props.isSingleSelect}/>
          );
    }
  });

  return select;
});
