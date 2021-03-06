<head>
    <meta charset="UTF-8">
   <!-- Bower Components -->
    <script src="bower_components/react/react-with-addons.js"></script>
    <script src="bower_components/lodash/dist/lodash.js"></script>
    <script src="bower_components/node-uuid/uuid.js"></script>


    <!-- Line Components -->
    <script src="components/Mixins.js"></script>
    <script src="components/LineComponent.js"></script>
    <script src="components/ApplicationComponent.js"></script>
    <script src="components/FunctionNameComponent.js"></script>
    <script src="components/ListComponent.js"></script>
    <script src="components/IntComponent.js"></script>
    <script src="components/BoolComponent.js"></script>
    <script src="components/LinesComponent.js"></script>
    <script src="components/NodeComponent.js"></script>
    <script src="components/FunctionEditorComponent.js"></script>
    <script src="components/ProgramComponent.js"></script>

    <!-- AST Operations -->
    <script src="ast_transformations.js"></script>
    <script src="prelude.js"></script>

    <!-- Parser -->
    <script src="haskell-parser.js"></script>

    <!-- Functions -->
    <script src="functions/builtins.js"></script>

    <!-- AST Node Types -->
    <script src="astNodeType/int.js"></script>
    <script src="astNodeType/bool.js"></script>
    <script src="astNodeType/list.js"></script>
    <script src="astNodeType/application.js"></script>
    <script src="astNodeType/functionName.js"></script>


    <!-- Styles -->
    <link rel="stylesheet" href="app.css">
</head>

<div id="function-editor"></div>

<div style="width:70%">
# Lesson 2 &mdash; Lists

Lists are a fundamental data structure in functional programming
representing a *sequence* of values. Unlike sets, order matters in lists and
there can be repeated values.


<div id="eval0"></div>
<script>
    React.renderComponent(
      HaskellJSProgram({defaultValue: '1 : [2,2,1,4]'}),
      document.getElementById('eval0')
    );
</script>

<div id="eval1"></div>
<script>
React.renderComponent(
	HaskellJSProgram({defaultValue: '1 : 2 : 2 : 1 : 4 : []'}),
	document.getElementById('eval1')
);
</script>


<div id="eval2"></div>
<script>
	React.renderComponent(
      HaskellJSProgram({defaultValue: 'length [1,2,2,1,4]'}),
      document.getElementById('eval2')
    );
</script>

<div id="eval3"></div>
<script>
	React.renderComponent(
      HaskellJSProgram({defaultValue: 'length [[1,2],[2],[1,4]]'}),
      document.getElementById('eval3')
    );
</script>

<div id="eval4"></div>
<script>
	React.renderComponent(
      HaskellJSProgram({defaultValue: '[1,2,3] ++ [4,5]'}),
      document.getElementById('eval4')
    );
</script>

</div>





	
<script>
	var lesson02 = prelude['length'] + prelude['append'] + 
		"count :: Int -> [Int]\ncount 0 = []\ncount n = n : count (n-1)\n";

    React.renderComponent(
      FunctionEditor({defaultFunctionDefinitions: lesson02}),
      document.getElementById('function-editor')

    );

</script>

* * * 

Continue to Lesson 3.


