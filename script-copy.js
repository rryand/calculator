function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case add:
            return add(num1, num2);
        case subtract:
            return subtract(num1, num2);
        case multiply:
            return multiply(num1, num2);
        case divide:
            return divide(num1, num2);
    }
}
// Global Variables
let num1, num2;

// HTML DOM
let topText = document.getElementById('screen-top');
let bottomText = document.getElementById('screen-bottom');
let calcBody = document.getElementById('calc-body');
calcBody.addEventListener('click', function(e) {
    let btn = e.target;
    if (btn.className == 'number') drawBottomScreen(btn);
    else {
        let value = btn.textContent;
        switch(value) {
            case 'AC':
                num1 = '';
                num2 = '';
                topText.textContent = '';
                bottomText.textContent = '';
                break;
            case '+/-':
                (topText.textContent[0] == '-') ? topText.textContent = topText.textContent.substring(1) : 
                    topText.textContent = '-' + topText.textContent;
                break;
            case '+':
                if (isNaN(parseInt(bottomText.textContent))) break;
                if (!num1) {
                    num1 = bottomText.textContent;
                    drawTopScreen(btn);
                }
                else {
                    topText.textContent += bottomText.textContent + '+';
                    bottomText.textContent = add(num1, parseInt(topText.textContent));
                }
                break;
        }
    }
});

function drawTopScreen(btn) {
    topText.textContent = bottomText.textContent + btn.textContent;
}

function drawBottomScreen(btn) {
    bottomText.textContent += btn.textContent;
}

function clearBottomScreen() {
    bottomText.textContent = ''
}