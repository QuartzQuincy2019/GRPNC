function isOperator(token) {
    return token === "+" || token === "-" || token === "*" || token === "/";
}

function isFunction(token) {
    return token === "sqrt" || token === "pow" || token === "ln" || token === "log" || token === "square" || token === "cube";
}

function isSeparator(token) {
    return token === ",";
}

function getNextToken(expression, pos) {
    while (pos[0] < expression.length && expression[pos[0]] === ' ') {
        pos[0]++;
    }
    if (pos[0] >= expression.length) return "";

    if (isdigit(expression[pos[0]]) || expression[pos[0]] === '.' ||
        (expression[pos[0]] === '-' && (pos[0] === 0 || expression[pos[0] - 1] === '('))) {
        let number = expression[pos[0]] === '-' ? '-' : '';
        if (expression[pos[0]] === '-') pos[0]++;
        while (pos[0] < expression.length && (isdigit(expression[pos[0]]) || expression[pos[0]] === '.')) {
            number += expression[pos[0]++];
        }
        return number;
    }
    else if (isalpha(expression[pos[0]])) {
        let func = "";
        while (pos[0] < expression.length && isalpha(expression[pos[0]])) {
            func += expression[pos[0]++];
        }
        return func;
    }
    else {
        return expression[pos[0]++];
    }
}

function isdigit(ch) {
    return /\d/.test(ch);
}

function isalpha(ch) {
    return /[a-zA-Z]/.test(ch);
}

function infixToPostfix(infix) {
    let stack = [];
    let postfix = "";
    let pos = [0];

    let token = getNextToken(infix, pos);

    while (token !== "") {
        if (!isNaN(parseFloat(token)) && isFinite(token)) {
            postfix += token + " ";
        }
        else if (token === "(") {
            stack.push(token);
        }
        else if (token === ")") {
            while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                postfix += stack.pop() + " ";
            }
            stack.pop();
            if (stack.length > 0 && isFunction(stack[stack.length - 1])) {
                postfix += stack.pop() + " ";
            }
        }
        else if (isSeparator(token)) {
            while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                postfix += stack.pop() + " ";
            }
        }
        else if (isOperator(token) || isFunction(token)) {
            while (stack.length > 0 && precedence[stack[stack.length - 1]] >= precedence[token] && !isFunction(stack[stack.length - 1])) {
                postfix += stack.pop() + " ";
            }
            stack.push(token);
        }

        token = getNextToken(infix, pos);
    }

    while (stack.length > 0) {
        postfix += stack.pop() + " ";
    }

    return postfix;
}

let precedence = {
    "+": 1, "-": 1,
    "*": 2, "/": 2,
    "sqrt": 3, "pow": 3, "ln": 3, "log": 3, "square": 3, "cube": 3,
    ",": 0
};


function calculatePostfix(postfix) {
    let stack = [];
    let tokens = postfix.split(" ").filter(token => token.trim() !== "");

    tokens.forEach(token => {
        if (!isNaN(parseFloat(token)) && isFinite(token)) {
            stack.push(parseFloat(token));
        } else {
            switch (token) {
                case "+":
                    stack.push(stack.pop() + stack.pop());
                    break;
                case "-":
                    stack.push(-stack.pop() + stack.pop());
                    break;
                case "*":
                    stack.push(stack.pop() * stack.pop());
                    break;
                case "/":
                    let divisor = stack.pop();
                    stack.push(stack.pop() / divisor);
                    break;
                case "sqrt":
                    stack.push(Math.sqrt(stack.pop()));
                    break;
                case "square":
                    stack.push(Math.pow(stack.pop(), 2));
                    break;
                case "cube":
                    stack.push(Math.pow(stack.pop(), 3));
                    break;
                case "pow":
                    let exponent = stack.pop();
                    stack.push(Math.pow(stack.pop(), exponent));
                    break;
                case "ln":
                    stack.push(Math.log(stack.pop()));
                    break;
                case "log":
                    let antilogarithm = stack.pop();
                    let base = stack.pop();
                    stack.push(Math.log(antilogarithm) / Math.log(base));
                    break;
                default:
                    throw new Error("Unsupported operation: " + token);
            }
        }
    });

    if (stack.length !== 1) {
        throw new Error("Invalid postfix expression");
    }

    return stack.pop();
}

function calculate(infix) {
    return calculatePostfix(infixToPostfix(infix));
}

var calculatorTitle = document.getElementById("calculatorTitle");