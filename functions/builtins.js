window.builtins = [];

window.builtins.push({
  name: ':',
  englishName: 'cons',
  color: 'black',
  infix: true,
  typeSignature: 'a -> [a] -> [a]',
  isValidApplication: function(arguments) {
    // TODO paramaterize list time
    return arguments.length === 2 &&
           arguments[1].type === 'list';
  },
  astToString: function(arguments) {
   return ":";
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        var items = arguments[1].items;
        items.unshift(arguments[0]);

        return {
          id: uuid.v4(),
          type: 'list',
          items: items
        };
      }
    }
  ]
});


window.builtins.push({
  name: '+',
  englishName: 'plus',
  color: 'purple',
  infix: true,
  typeSignature: 'Int -> Int -> Int',
  isValidApplication: function(arguments) {
    return arguments.length === 2      &&
           arguments[0].type === 'int' &&
           arguments[1].type === 'int';
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        return {
                 id: uuid.v4(),
                 type: 'int',
                 value: arguments[0].value  + arguments[1].value
               };
      }
    }
  ]
});

window.builtins.push({
  name: '-',
  englishName: 'minus',
  color: 'purple',
  infix: true,
  typeSignature: 'Int -> Int -> Int',
  isValidApplication: function(arguments) {
    return arguments.length === 2      &&
           arguments[0].type === 'int' &&
           arguments[1].type === 'int';
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        return {
                 id: uuid.v4(),
                 type: 'int',
                 value: arguments[0].value - arguments[1].value
               };
      }
    }
  ]
});

window.builtins.push({
  name: '*',
  englishName: 'times',
  color: 'purple',
  infix: true,
  typeSignature: 'Int -> Int -> Int',
  isValidApplication: function(arguments) {
    return arguments.length === 2      &&
           arguments[0].type === 'int' &&
           arguments[1].type === 'int';
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        return {
                 id: uuid.v4(),
                 type: 'int',
                 value: arguments[0].value * arguments[1].value
               };
      }
    }
  ]
});
		     
window.builtins.push({
  name: 'div',
  englishName: 'div',
  color: 'purple',
  infix: false,
  typeSignature: 'Int -> Int -> Int',
  isValidApplication: function(arguments) {
    return arguments.length === 2      &&
           arguments[0].type === 'int' &&
           arguments[1].type === 'int';
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        return {
                 id: uuid.v4(),
                 type: 'int',
                 value: Math.floor(arguments[0].value / arguments[1].value)
               };
      }
    }
  ]
});

window.builtins.push({
  name: 'mod',
  englishName: 'mod',
  color: 'purple',
  infix: false,
  typeSignature: 'Int -> Int -> Int',
  isValidApplication: function(arguments) {
    return arguments.length === 2      &&
           arguments[0].type === 'int' &&
           arguments[1].type === 'int';
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        return {
                 id: uuid.v4(),
                 type: 'int',
                 value: (arguments[0].value % arguments[1].value)
               };
      }
    }
  ]
});




/* polymorphic equality ==, /=
 */
var poly_equals = function(arg0, arg1) {
    if(arg0.type != arg1.type) return false;
    if(arg0.type === "int" || arg0.type === "bool") {
	return arg0.value == arg1.value;
    }
    if(arg0.type === "list") {
	if (arg0.items.length != arg1.items.length)
	    return false;
	for(var i = 0; i<arg0.items.length; i++) {
	    if(!poly_equals(arg0.items[i], arg1.items[i]))
		return false;
	}
	return true;
    } else
	return false;
};


window.builtins.push({
  name: '==',
  englishName: '==',
  color: 'purple',
  infix: true,
  typeSignature: 'Eq a => a -> a -> Bool',
  isValidApplication: function(arguments) {
    return arguments.length === 2      &&
          arguments[0].type === arguments[1].type &&
	  (arguments[0].type === "int" ||
	   arguments[0].type === "bool" ||
	   arguments[0].type === "list");
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        return {
                 id: uuid.v4(),
                 type: 'bool',
                 value: poly_equals(arguments[0], arguments[1])
               };
      }
    }
  ]
});

window.builtins.push({
  name: '/=',
  englishName: '/=',
  color: 'purple',
  infix: true,
  typeSignature: 'Eq a => a -> a -> Bool',
  isValidApplication: function(arguments) {
    return arguments.length === 2      &&
          arguments[0].type === arguments[1].type &&
	  (arguments[0].type === "int" ||
	   arguments[0].type === "bool" ||
	   arguments[0].type === "list");
  },
  patterns: [
    {
      definitionLine: null,
      doesMatch: function(arguments){
        return true;
      },
      apply: function(arguments){
        return {
                 id: uuid.v4(),
                 type: 'bool',
                 value: !poly_equals(arguments[0], arguments[1])
               };
      }
    }
  ]
});
