var infixExpression = "";
var strong = "<strong>";
var _strong = "</strong>";
calculatorTitle.innerHTML = "Glue RPN Calculator -- " + __version;
function updateResultDisplay(postfixExpression, result) {
    document.getElementById("calculatedResult").innerHTML = "Result: " + strong + result + _strong;
    document.getElementById("postfixResult").innerHTML = "RPN: " + strong + postfixExpression + _strong;
}
function updateInputValue() {
    // 获取input元素
    var inputElement = document.getElementById("expressionInput");
    // 获取用户输入的内容
    infixExpression = inputElement.value;
    var postfixExpression = infixToPostfix(infixExpression);
    var res = calculatePostfix(postfixExpression);
    if (isNaN(res)) {
        return;
    }
    updateResultDisplay(postfixExpression, res);
};