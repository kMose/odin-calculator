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
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '*':
            return multiply(x,y);    
        case '/':
            return divide(x,y);        
    }
}

let calcDisplay = document.querySelector("#calc-display");

// Event listeners for all number buttons
document.querySelectorAll(".number-button").forEach(item => {
    item.addEventListener('click', () => {
        calcDisplay.value += item.dataset.number;
    })
});

// Event listeners for operator buttons
document.querySelectorAll(".operators").forEach(item => {
    item.addEventListener('click', () => {
        calcDisplay.value += item.dataset.type;
    })
});

// Clear display button
document.querySelector("#clear").addEventListener("click", () => {
    calcDisplay.value = "";
});


