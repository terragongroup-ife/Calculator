let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector('.screen');
let operators = ["+", "-", "*", "/","(",")"]; 
let symbols = ["Clr", "C", "="];

document.querySelector('.calc-buttons').addEventListener("click",function(event){
buttonClick(event.target.innerText);
})

function buttonClick(value) {
    if (symbols.includes(value) === true) {
        handleSymbol(value);
        screen.innerText += '';
    } 
    else if (operators.includes(value) === true) {
        if(screen.innerText === "0"){
            screen.innerText = value;
        }
        else{
        screen.innerText += value;
        }
    }
    else {
         if(screen.innerText === "0") {
            screen.innerText = value;
        }
        else{
        screen.innerText += value;
        }
    }

function handleSymbol(value) {
    switch  (value) {
        case 'Clr':
        screen.innerText = "0";
        runningTotal = 0;
        break;
        case "=":
        Calculate();
        break;
        case "C":
        if (screen.innerText.length === 1) {
            screen.innerText = "0";
        } else {
            screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1);
        }
        break;
    }
}

function Calculate() {
    cArr = [];
    for (i = 0; i <= screen.innerText.length; i++){
    cArr.push(screen.innerText[i]);
    }
    console.log(cArr);
    //Handle Multiply
    for (i = 0; i <= cArr.length; i++) {
        cItem = cArr[ i ];
        if (cItem == '*') {
            tLeft = parseFloat(cArr[ i - 1 ]);
            tRight = parseFloat(cArr[ i + 1 ]);

            nVal = tLeft * tRight;
            cArr[ i - 1 ] = nVal;
            cArr.splice(i, 2);
            i = cArr.length;
        }
    }
    console.log(cArr);
    //Handle Divide
    for (i = 0; i <= cArr.length; i++) {
        cItem = cArr[ i ];
        if (cItem == '/') {
            tLeft = parseFloat(cArr[ i - 1 ]);
            tRight = parseFloat(cArr[ i + 1 ]);

            nVal = tLeft / tRight;
            cArr[ i - 1 ] = nVal;
            cArr.splice(i, 2);
            i = cArr.length;
        }
    }
    console.log(cArr);
    //Handle Plus and Minus
    var runningTotal = parseFloat(cArr[ 0 ]);
    for (i = 1; i < cArr.length; i++) {
        if (cArr[ i ] == '+') {
            runningTotal = runningTotal + parseFloat(cArr[ i + 1 ]);
        } else if (cArr[ i ] == '-') {
            runningTotal = runningTotal - parseFloat(cArr[ i + 1 ]);
        }
        i++;
    }
    screen.innerText  = runningTotal;
} 
}   

var operationData = {
    add: {
      precedence: 1,
      name: 'add',
      operation: function (a, b) {return a + b;},
      output: function (a, b) {return a + ' + ' + b;},
      buttonHTML: '+'
    },
    subtract: {
      precedence: 1,
      name: 'subtract',
      operation: function (a, b) {return a - b;},
      output: function (a, b) {return a + ' - ' + b;},
      buttonHTML: '-'
    },
    multiply: {
      precedence: 2,
      name: 'multiply',
      operation: function (a, b) {return a * b;},
      output: function (a, b) {return a + ' * ' + b;},
      buttonHTML: '*'
    },
    divide: {
    precedence: 2,
    name: 'divide',
    operation: function (a, b) {return a / b;},
    isInvalidInput: function (a, b) {return b == 0 ? 'division by 0' : false;},
    output: function (a, b) {return a + ' / ' + b;},
    buttonHTML: '/'
    },
    bracket: {
        precedence: 3,
        singleInput: true,
        name: 'context',
        operation: function (a) {return a;},
        output: function (a) {return '(' + a + ')';}
      }
    }
    // return {
    //        openContext: function () {
    //         error && reset();
    //         var lastOperation = levels.peek().peek();
    //         if (closedContext || lastOperation && lastOperation.isSaturated()) return;
    //         levels.push(new Stack);
    //         return this;
    //       },
    //        closeContext: function (number) {
    //         error && reset();
    //         if (levels.length <= 1) return;
    //         var input = closedContext || number;
    //         var stack = levels.peek();
    //         var lastOperation = stack.peek();
    //         closedContext = new Operation(operationData.context).addInput(
    //           lastOperation ? (function () {
    //             lastOperation.addInput(input);
    //             collapse(0);
    //             return stack.pop();
    //           }()) : input
    //         );
    //         partialResult = Number(closedContext);
    //         levels.pop();
    //         return this;
    //       }
   // }