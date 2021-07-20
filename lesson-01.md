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
# Lesson 1 &mdash; Computation by evaluation

The fundamental notion for computation with functional programs
is evaluation of an *expression*. Simple expressions are built up
from constants and arithmetic operations.
Evaluation proceeds by steps reducing sub-expressions 
until the expression cannot be simplified any further &mdash; i.e.,
until we reach a *value*.

Click on the subexpressions below to evaluate the expression.
Note that you can perform evaluations in diferent order, but the
result will always be the same.

<div id="eval0"></div>
<script>
React.renderComponent(
	HaskellJSProgram({defaultValue: '1 + (2*3) + (4*5)'}),
	document.getElementById('eval0')
);
</script>

Besides basic arithmetic operations we can define *functions* by
equations. Simple functions can be defined by single equations. For example:

`double x = 2*x`

:  computes the double of a number;

`square x = x*x`

:  computes the square of a number.

Evaluation of a function application proceeds by replacing the
actual argument for the parameter `x` the right-hand side of the definition.

Click on the function applications below to evaluate the
expression. Note that you can evaluate either function first; the
result will be the same, but choosing `double` first requires fewer
steps to evaluate &mdash; i.e., it is a more *eficient* strategy.

<div id="eval1"></div>
<script>
    React.renderComponent(
      HaskellJSProgram({defaultValue: 'square (double 5)'}),
      document.getElementById('eval1')
    );
</script>

Functions can operate on things other than just numbers. For example,
the `even` function takes a number and produces a *boolean*: `True` if
the number is even (0, 2, 4, etc.) or `False` otherwise.  The
definition of `even` states that a number `n` is even if the remainder of the
integer division (*modulus*) by 2 is equal to zero.

<div id="eval2"></div>
<script>
	React.renderComponent(
      HaskellJSProgram({defaultValue: 'even (square 5)'}),
      document.getElementById('eval2')
    );
</script>
</div>

	
<script>
	var lesson01 = "square :: Int -> Int\nsquare x = x*x\n\ndouble :: Int -> Int\ndouble x = 2*x\n\neven :: Int -> Bool\neven x = (mod x 2) == 0\n";

    React.renderComponent(
      FunctionEditor({defaultFunctionDefinitions: lesson01}),
      document.getElementById('function-editor')

    );

</script>

* * * 

Continue to Lesson 2.


