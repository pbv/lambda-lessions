var Bool = React.createClass({displayName: 'Bool',
  mixins: [NodeMixins],
  render: function() {
      return React.DOM.span({className: 'bool'}, (this.currentAST().value ? "True" : "False"));
  }
});
