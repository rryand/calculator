// Calculator Object
let calculator = {
    // Variables
    total: null,
    operator: null,
    maxChar: 16,
    decimal: false,
    topText: document.getElementById('screen-top'),
    bottomText: document.getElementById('screen-bottom'),
    calcBody: document.getElementById('calc-body'),

    // Methods
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => num1 / num2,
    operate: (operator, num1, num2) => {
        switch(operator) {
            case '+':
                return calculator.add(num1, num2);
            case '-':
                return calculator.subtract(num1, num2);
            case 'X':
                return calculator.multiply(num1, num2);
            case '/':
                return calculator.divide(num1, num2);
        }
    },
    useOtherOperation: function(btn) {
        let value = btn.textContent;
        switch(value) {
            case 'AC':
                this.total = '';
                this.currentNum = '';
                this.operator = '';
                this.topText.textContent = '';
                this.bottomText.textContent = '';
                break;
            case '+/-':
                (this.bottomText.textContent[0] === '-') ? 
                    this.bottomText.textContent = this.bottomText.textContent.substring(1) : 
                    this.bottomText.textContent = '-' + this.bottomText.textContent;
                break;
            case '=':
                this.evaluate(btn);
                if (this.getLength(this.total) > this.maxChar) {
                    this.bottomText.textContent = this.truncateTotalValue(this.total, this.getLength(this.total), this.maxChar);
                    break;
                }
                this.bottomText.textContent = this.total;
                break;
            case '%':
                if(!this.bottomText.textContent) return;
                this.total = parseFloat(this.bottomText.textContent) / 100;
                this.bottomText.textContent = this.total;
                this.operator = '%';
                break;
        }
    },
    drawTopScreen: (btn) => calculator.topText.textContent += calculator.bottomText.textContent + ` ${btn.textContent} `,
    drawBottomScreen: (btn) => calculator.bottomText.textContent += btn.textContent,
    clearTopScreen: () => calculator.topText.textContent = '',
    clearBottomScreen: () => calculator.bottomText.textContent = '',
    evaluate: function(btn) {
        let currentNum = parseFloat(calculator.bottomText.textContent)
        if (isNaN(currentNum)) return;
        this.drawTopScreen(btn);
        this.clearBottomScreen();
        if (!this.total || this.operator === '=' || this.operator === '%') {
            calculator.total = currentNum;
            calculator.operator = btn.textContent;
            console.log(this.total);
            return;
        }
        if (this.operator === '/' && currentNum === 0) {
            calculator.total = 'Oops, can\'t do that.';
            return;
        }
        calculator.total = this.operate(calculator.operator, calculator.total, currentNum);
        console.log(`${calculator.operator}, ${calculator.total}, ${currentNum}`);
        console.log(`total = ${calculator.total}`);
        calculator.operator = btn.textContent;
    },
    getLength: (total) => Math.ceil(Math.log10(total)),
    truncateTotalValue: (total, length, maxChar) => {
        console.log(`truncate: ${total}`);
        console.log(`length: ${length}`);
        return `${Math.round(total / Math.pow(10, length - maxChar + 3))}e${length-maxChar+3}`;
    },
};

// DOM Manipulation
calculator.calcBody.addEventListener('click', function(e) {
    let btn = e.target;
    if (btn.className === 'number' && calculator.bottomText.textContent.length !== calculator.maxChar)
        calculator.drawBottomScreen(btn);
    else if (btn.className === 'operator') {
        if (calculator.operator === '=') calculator.clearTopScreen();
        calculator.evaluate(btn);
    }
    else calculator.useOtherOperation(btn);
});