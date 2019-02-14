let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector('.screen');
let operators = ["+", "-", "*", "/"]; 
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
}
  
// function handleNumber(value) {
//   if(buffer === "0") {
//         buffer = value;
//     } else {
//         buffer += value;
//     }
//  }

function handleSymbol(value) {
    switch  (value) {
        case 'Clr':
        screen.innerText = "0";
        runningTotal = 0;
        // previousOperator = null;
        break;
        case "=":
        // if(previousOperator === null) {
        //     return;
        // }
        // previousOperator = null;
        Calculate();
        // runningTotal = 0;
        break;
        case "C":
        if (screen.innerText.length === 1) {
            screen.innerText = "0";
        } else {
            screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1);
        }
        break;
    //  default:
    //      handleMath(value);
    //   break;
    }
}

// function handleMath(value) {
//     const intBuffer = parseInt(buffer);
//     if (runningTotal === 0){
//         runningTotal = intBuffer;
//     } else {
//         flushOperation(intBuffer);
//     }

//     previousOperator = value;

//      buffer = "0";
// }

// function flushOperation () {
//     if (previousOperator === "+") {
//         runningTotal += intBuffer;
//     } else  if (previousOperator === "-") {
//         runningTotal -= intBuffer;
//     } else  if (previousOperator === "*") {
//         runningTotal *= intBuffer;
//     } else {
//         runningTotal /= intBuffer;
//     }
//     }

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
