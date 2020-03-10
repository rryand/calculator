// Outdated
// Global Variables
let total, currentNum, operator, maxChar = 16, decimal = false;

// Math functions
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
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'X':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function useOtherOperation(btn) {
    let value = btn.textContent;
    switch(value) {
        case 'AC':
            total = '';
            currentNum = '';
            operator = '';
            topText.textContent = '';
            bottomText.textContent = '';
            break;
        case '+/-':
            (bottomText.textContent[0] === '-') ? 
                bottomText.textContent = bottomText.textContent.substring(1) : 
                bottomText.textContent = '-' + bottomText.textContent;
            break;
        case '=':
            evaluate(btn);
            if (getLength(total) > maxChar) {
                bottomText.textContent = truncateTotalValue(total, getLength(total), maxChar);
                break;
            }
            bottomText.textContent = total;
            break;
        case '%':
            if(!bottomText.textContent) return;
            total = parseFloat(bottomText.textContent) / 100;
            bottomText.textContent = total;
            operator = '%';
            break;
    }
}

// HTML DOM
let topText = document.getElementById('screen-top');
let bottomText = document.getElementById('screen-bottom');
let calcBody = document.getElementById('calc-body');
calcBody.addEventListener('click', function(e) {
    let btn = e.target;
    if (btn.className === 'number' && bottomText.textContent.length !== maxChar)
        drawBottomScreen(btn);
    else if (btn.className === 'operator') {
        if (operator === '=') clearTopScreen();
        evaluate(btn);
    }
    else useOtherOperation(btn);
});

function drawTopScreen(btn) {
    topText.textContent += bottomText.textContent + ` ${btn.textContent} `;
}

function drawBottomScreen(btn) {
    bottomText.textContent += btn.textContent;
}

function clearTopScreen() {
    topText.textContent = '';
}

function clearBottomScreen() {
    bottomText.textContent = '';
}

function evaluate(btn) {
    currentNum = parseFloat(bottomText.textContent)
    if (isNaN(currentNum)) return;
    drawTopScreen(btn);
    clearBottomScreen();
    if (!total || operator === '=' || operator === '%') {
        total = currentNum;
        operator = btn.textContent;
        console.log(total);
        return;
    }
    if (operator === '/' && currentNum === 0) {
        total = 'Oops, can\'t do that.';
        return;
    }
    total = operate(operator, total, currentNum);
    console.log(`${operator}, ${total}, ${currentNum}`);
    console.log(`total = ${total}`);
    operator = btn.textContent;
}

function getLength(total) {
    return Math.ceil(Math.log10(total));
}

function truncateTotalValue(total, length, maxChar) {
    console.log(`truncate: ${total}`);
    console.log(`length: ${length}`);
    return `${Math.round(total / Math.pow(10, length - maxChar + 3))}e${length-maxChar+3}`;
}