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
            if(!x && !y){
                x = calcDisplay.value;
                operator = item.dataset.type;
                calcDisplay.value = "";
            } else if (x && !y){
                y = calcDisplay.value;
                calcDisplay.value = operate(x,y, operator);
                x = calcDisplay.value;
                y = "";
                operator = item.dataset.type;
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
        y = calcDisplay.value;        
        calcDisplay.value = operate(x,y, operator);



});


