function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x*y;
}

function divide(x, y){

    if (x == 0 || y == 0) return "You can't divide by zero, you dingus!";
    return x / y;

}

function operate(x, y, operator){

    switch(operator){
        case '+':
            return add(parseInt(x),parseInt(y));
        case '-':
            return subtract(x,y);
        case '*':
            return multiply(x,y);    
        case '/':
            return divide(x,y);        
    }
}

let calcDisplay = document.querySelector("#calc-display");
let x = "";
let y = "";
let operator = "";
let equalsPressed = false;
let clearFlag = false;

xDisplay = document.querySelector("#x-display");
yDisplay = document.querySelector("#y-display");
operatorDisplay = document.querySelector("#operator-display");
outputDisplay = document.querySelector("#output-display");

// Event listeners for all number buttons
document.querySelectorAll(".number-button").forEach(item => {
    item.addEventListener('click', () => {
        if (clearFlag){
            calcDisplay.value = "";
            clearFlag = false;
        }
        calcDisplay.value += item.dataset.number;
    });
});

// Event listeners for operator buttons
document.querySelectorAll(".operators").forEach(item => {
    item.addEventListener('click', () => {
        operator = item.dataset.type;
        if(!equalsPressed){
            if(!x){
                x = calcDisplay.value;
                clearFlag = true;
            } else if(x && !y){
                y = calcDisplay.value;
                calcDisplay.value = operate(x, y, operator)
                clearFlag = true;
                x = calcDisplay.value;
                y = "";
            }
        } else {
            equalsPressed = false;
        }

    });
});

// Clear display button AC
document.querySelector("#clear").addEventListener("click", () => {
    calcDisplay.value = "0";
    x = "";
    y = "";
    operator = "";
    equalsPressed = false;
    clearFlag = true;
});

// Equals button

document.querySelector("#equals-button").addEventListener("click", () => {     
            y = calcDisplay.value;
            calcDisplay.value = operate(x, y, operator)
            clearFlag = true;
            x = calcDisplay.value;
            y = "";
            equalsPressed = true;


});

// Updates the display div. If variable is unknown, display "?"
function updateDisplay(x, y, result, operator){
    xDisplay.textContent = x;
    y === "" ? yDisplay.textContent = "?" : yDisplay.textContent = y;
    operatorDisplay.textContent = operator;
    result === "" ? outputDisplay.textContent = "?" : outputDisplay.textContent = result;
}

