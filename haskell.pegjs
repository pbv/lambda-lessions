{
  function randomId() { return (window.uuid ? uuid.v4() : 'placeholder'); }
}

start
  = expressionWithFunction

functionDefinitionList
  = functionDefinitionPlusWhitespace*

functionDefinitionPlusWhitespace
  = functionDefinition:functionDefinition whitespace_newline { return functionDefinition; }

functionDefinition
  = prefixFunctionDefinition
  / infixFunctionDefinition

prefixFunctionDefinition
  = functionName:functionName typeSignature:functionDefinitionTypeSignature patterns:functionDefinitionPatternLine+ { return {
    name: functionName.name,
    englishName: functionName.name,
    typeSignature: typeSignature,
    infix: false,
    patterns: patterns,
    isValidApplication: function(functionArguments) { return functionArguments.length === patterns[0].numberOfArguments;
  }}; }


infixFunctionDefinition
  = "(" functionName:infixFunctionName ")" typeSignature:functionDefinitionTypeSignature patterns:infixFunctionDefinitionPatternLine+ { return {
    name : functionName.name,
    englishName: functionName.name,
    typeSignature: typeSignature,
    infix: true,
    patterns: patterns,
    isValidApplication: function(functionArguments) {
          return (functionArguments.length == 2); }
	  }; }

functionDefinitionTypeSignature
  = whitespace? "::" whitespace? typesig:[ \(\)\[\]A-Za-z>-]+ { return typesig.join(""); }

functionDefinitionPatternLine
  = whitespace_newline functionName part:functionDefinitionPatternPartOfLine { return part; }

functionDefinitionPatternPartOfLine
  = patternArguments:patternWithWhitespace* whitespace? "=" whitespace exp:expressionWithFunction { return {
    definitionLine: text(),
    numberOfArguments: patternArguments.length,
    doesMatch: function(args) {
      for (var i=0; i<patternArguments.length; i++) {
	if(patternArguments[i].forceEval(args[i])) return false;
        if(patternArguments[i].doesMatch &&
	   !patternArguments[i].doesMatch(args[i])) return false;
      }
      return true;
    },
    forceEval: function(args) {
    	       for (var i=0;i<patternArguments.length; i++) {
	       	if(patternArguments[i].forceEval(args[i])) return true;	       
	       }
	       return false;
    },
    apply: function(functionArguments) {
    	   return ASTTransformations.fillInArguments(exp, patternArguments, functionArguments); }
  }; }

infixFunctionDefinitionPatternLine
  = whitespace_newline pattern1:pattern whitespace? infixFunctionName whitespace? pattern2:pattern whitespace? "=" whitespace? exp:expressionWithFunction {
    return {
    definitionLine: text(),
    numberOfArguments: 2,
    doesMatch: function(args) {
    	       if(pattern1.doesMatch && !pattern1.doesMatch(args[0]))
	       	  return false;
    	       if(pattern2.doesMatch && !pattern2.doesMatch(args[1]))
	       	  return false;
	       return true;	 
	      	},
     forceEval: function(args) {
     		return ((pattern1.forceEval && pattern1.forceEval(args[0])) ||
		       (pattern2.forceEval && pattern2.forceEval(args[1])));
		       },
   apply: function(args) {
   	  var patterns = [pattern1, pattern2];
	  return ASTTransformations.fillInArguments(exp,patterns,args); }
	  };
  }


patternWithWhitespace
  = whitespace pattern:pattern { return pattern; }

pattern
  = "[" whitespace* "]" { return {id: randomId(), type: "emptyListPattern", doesMatch: function(arg) { return arg.type === "list" && arg.items.length === 0; },
  forceEval: function(arg) { return arg.type !== "list"; }
  }; }
  / "(" left:functionName ":" right:functionName ")" { return {id: randomId(), type: "listPattern", left: left, right: right, doesMatch: function(arg) { return arg.type === "list" && arg.items.length > 0; },
  forceEval: function(arg) { return arg.type !== "list"; } 
  }; }
  / "True" { return {id:randomId, type:"booleanPattern", doesMatch: function(arg) { return arg.type==="bool" && arg.value; },
  forceEval: function(arg) { return arg.type !== "bool"; } }; }
  / "False" { return {id:randomId, type:"booleanPattern", doesMatch: function(arg) { return arg.type==="bool" && !arg.value; },
    forceEval: function(arg) { return arg.type !== "bool"; }
  }; }
  / f:functionName { f.forceEval  = function(arg) { return false; }; return f }
  / integer:integer { integer.doesMatch = function(arg) { return arg.type === "int" && arg.value === integer.value; }; integer.forceEval = function(arg) { return arg.type !== "int"; }; return integer; }

expression
  = "(" whitespace? exp:expressionWithFunction whitespace? ")" { return exp; }
  / list
  / integer
  / boolean
  / functionName
  / "(" f:infixFunctionName ")" { return f; }

expressionWithFunction
  = infixFunctionApplication
  / functionApplication
  / expression

functionApplication
  = f:functionName whitespace args:expression_list {return {functionName: f, type: 'application', id: randomId(), arguments: args}};

infixFunctionApplication
  = left:expression whitespace? f:infixFunctionName whitespace? right:expressionWithFunction { return {id: randomId(), functionName: f, type: "application", arguments: [left, right]}}

expression_list
  = exp1:expression list:(whitespace_expression)* { list.unshift(exp1); return list; }

whitespace_expression
  = whitespace exp:expression { return exp; }

list
  = "[" whitespace? list:comma_expression_list? whitespace? "]" { return { id: randomId(), type: "list", items: list || [] }; }

comma_expression_list
  = exp1:expression list:(comma_expression)* { list.unshift(exp1); return list; }

comma_expression
  = whitespace? "," whitespace? exp:expression { return exp; }


functionName
  = letters:[A-Za-z]+ { return {id: randomId(), type: 'functionName', name: letters.join(""), infix: false}; }

infixFunctionName
  = "==" { return {id: randomId(), type: 'functionName', name: "==", infix:true}; }
  / "/=" { return {id: randomId(), type: 'functionName', name: "/=", infix:true}; }
  / "++" { return {id: randomId(), type: 'functionName', name: "++", infix: true}; }
  / "+" { return {id: randomId(), type: 'functionName', name: '+', infix: true}; }
  / "-" { return {id: randomId(), type: 'functionName', name: '-', infix: true}; }
  / "*" { return {id: randomId(), type: 'functionName', name: '*', infix: true}; }  
  / ":" { return {id: randomId(), type: 'functionName', name: ':', infix: true}; }
  / "`" f:functionName "`" { return f; }

integer
  = digits:[0-9]+ { return { id: randomId(), type: "int", value: parseInt(digits.join(""), 10)} ; }


boolean
  = "True" { return {id: randomId(), type: "bool", value: true}; }
  / "False" { return {id: randomId(), type: "bool", value: false}; }

whitespace
  = " "+

whitespace_newline
  = [ \n]+
