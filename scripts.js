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
            return add(parseFloat(x),parseFloat(y));
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
let equalsPressed = false; // Used to allow another number entry after calculation.
let clearFlag = false; // Used to clear prompt for a new number
let decimalPressed = false // Used to stop multiple decimals.
let operatorPressed = false; // Used in defending against EQUALS being undefined

xDisplay = document.querySelector("#x-display");
yDisplay = document.querySelector("#y-display");
operatorDisplay = document.querySelector("#operator-display");
outputDisplay = document.querySelector("#output-display");

// Event listeners for all number buttons
document.querySelectorAll(".number-button").forEach(item => {
    item.addEventListener('click', () => numberFunc(item));
});

// Event listeners for operator buttons
document.querySelectorAll(".operators").forEach(item => {
    item.addEventListener('click', () => operatorFunc(item));
});

// Clear display button AC
document.querySelector("#clear").addEventListener("click", () => {
    clearAll();
});

// Event Listener for Equals Button
document.querySelector("#equals-button").addEventListener("click", () => equalsFunc());

// Event Listener for Decimal Button
document.querySelector("#decimal").addEventListener("click", () => decimalFunc());

// Event Listener for plusMinus
document.querySelector("#plus-minus").addEventListener("click", () => {
    calcDisplay.textContent = calcDisplay.textContent * -1;
})

// Backspace button removes the last number from the display.
document.querySelector("#backsp").addEventListener("click", () => backspaceFunc());




function clearAll(){
    calcDisplay.textContent = "0";
    x = "";
    y = "";
    operator = "";
    updateDisplay("?", "?", "?", "+");
    equalsPressed = false;
    clearFlag = true;
    operatorPressed = false;
}

// Updates the display div. If variable is unknown, display "?"
function updateDisplay(x, y, result, operator){
    xDisplay.textContent = x;
    y === "" ? yDisplay.textContent = "?" : yDisplay.textContent = y;
    operatorDisplay.textContent = operator;
    result === "" ? outputDisplay.textContent = "?" : outputDisplay.textContent = result;
}

function operatorFunc(item){
    operator = item.dataset.type;
    operatorPressed = true;
    if(!equalsPressed){
        if(!x){
            x = calcDisplay.textContent;
            clearFlag = true;
            updateDisplay(x, "?", "?", operator)
        } else if(x && !y){
            y = calcDisplay.textContent;
            calcDisplay.textContent = operate(x, y, operator)
            clearFlag = true;
            updateDisplay(x, y, calcDisplay.textContent, operator)
            x = calcDisplay.textContent;
            y = "";
        }
    } else {
        updateDisplay(x, y, "?", operator)
        equalsPressed = false;
    }
}

function numberFunc(item){
    if (clearFlag){
        calcDisplay.textContent = "";
        decimalPressed = false;
        clearFlag = false;
    }
    calcDisplay.textContent += item.dataset.number;
}

function equalsFunc(){  
    if(operatorPressed){
        y = calcDisplay.textContent;
        calcDisplay.textContent = operate(x, y, operator)
        clearFlag = true;
        updateDisplay(x, y, calcDisplay.textContent, operator)
        x = calcDisplay.textContent;
        y = "";
        equalsPressed = true;
    }

    if (isNaN(x) || isNaN(y)){
        clearAll();
        outputDisplay.textContent = "You can't divide by 0, you dingus!"
    }
}

function decimalFunc(){
    if(calcDisplay.textContent == ""){
        calcDisplay.textContent += ".";
        decimalPressed = true;
    }

    // Checks to see if there is a decimal in the value string.
    for(let i = 0; i < calcDisplay.textContent.length; i++){
        if (calcDisplay.textContent[i] === ".")
            decimalPressed = true;
    }

    if(!decimalPressed){
        calcDisplay.textContent += ".";
        decimalPressed = true;
    }
}

function backspaceFunc(){
    calcDisplay.textContent = calcDisplay.textContent.slice(0, -1);
}