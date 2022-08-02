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
let temp ="";
let operator = "";
let calculated = false;

xDisplay = document.querySelector("#x-display");
yDisplay = document.querySelector("#y-display");
operatorDisplay = document.querySelector("#operator-display");
outputDisplay = document.querySelector("#output-display");

// Event listeners for all number buttons
document.querySelectorAll(".number-button").forEach(item => {
    item.addEventListener('click', () => {
        if(calculated) calcDisplay.value = "";
        calcDisplay.value += item.dataset.number;
    })
});

// Event listeners for operator buttons
document.querySelectorAll(".operators").forEach(item => {
    item.addEventListener('click', () => {
        // Each time an operator key is pressed, check to see which variables have been
        // entered. Calculate them if x and y are present. Afterwards be prepared for
        // more operations with the "calculated" flag.
            if(calculated){
                x = 69;
                y = 69;
                calcDisplay.value = 69;
                operator = item.dataset.type;
                updateDisplay(x, y, calcDisplay.value, operator);
            }else if(!x && !y){
                x = calcDisplay.value;
                operator = item.dataset.type;
                updateDisplay(x, y, "?", operator);
                calcDisplay.value = "";
            } else if (x && !y){
                y = calcDisplay.value;
                operator = item.dataset.type;
                calcDisplay.value = operate(x,y, operator);
                updateDisplay(x, y, calcDisplay.value, operator);
                x = calcDisplay.value;
                y = "";
                calculated = true;
            }
        }
    );
});

// Clear display button
document.querySelector("#clear").addEventListener("click", () => {
    calcDisplay.value = "";
    x = "";
    y = "";
    operator = "";
    calculated = false;
});

// Equals button

document.querySelector("#equals-button").addEventListener("click", () => {     
        if (!calculated && x){
            calcDisplay.value == "" ? y = 0 : y = calcDisplay.value;
            calcDisplay.value = operate(x,y, operator);
            updateDisplay(x, y, calcDisplay.value, operator);
            calculated = true;
        }

});

// Updates the display div. If variable is unknown, display "?"
function updateDisplay(x, y, result, operator){
    xDisplay.textContent = x;
    y === "" ? yDisplay.textContent = "?" : yDisplay.textContent = y;
    operatorDisplay.textContent = operator;
    result === "" ? outputDisplay.textContent = "?" : outputDisplay.textContent = result;
}
