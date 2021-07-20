window.astNodeTypes['bool'] = {
  type: 'bool',
  color: 'blue',
  typeSignature: 'Bool',
  astToString: function(node) {
      return (node.value ? "True" : "False");
  }
};
