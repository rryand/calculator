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
    decimalButton: document.getElementById('decimal'),

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
                this.resetVariables();
                this.clearTopScreen();
                this.clearBottomScreen();
                break;
            case '+/-':
                (this.bottomText.textContent[0] === '-') ? 
                    this.bottomText.textContent = this.bottomText.textContent.substring(1) : 
                    this.bottomText.textContent = '-' + this.bottomText.textContent;
                break;
            case '=':
                if (!this.total) return;
                this.evaluate(btn);
                if (this.getLength(this.total) > this.maxChar)
                    this.total = this.truncateTotalValue(this.total, this.getLength(this.total));
                if (Math.round(this.total) !== this.total) {
                    this.decimal = true;
                    this.decimalButton.className = 'disabled';
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
    resetVariables: () => {
        calculator.total = '';
        calculator.currentNum = '';
        calculator.operator = '';
        calculator.decimal = false;
        calculator.decimalButton.className = '';
    },
    evaluate: function(btn) {
        let currentNum = parseFloat(this.bottomText.textContent);
        if (isNaN(currentNum)) return;
        this.drawTopScreen(btn);
        this.clearBottomScreen();
        if (this.operator === '/' && currentNum === 0) {
            this.total = 'Oops, can\'t do that.';
            return;
        }
        (this.total && this.operator !== '=' && this.operator !== '%') ? 
            this.total = this.operate(this.operator, this.total, currentNum) : 
            this.total = currentNum;
        console.log(`${this.operator}, ${this.total}, ${currentNum}`);
        console.log(`total = ${this.total}`);
        this.operator = btn.textContent;
        this.decimal = false;
        this.decimalButton.className = '';
    },
    getLength: (total) => total.toString().length,
    truncateTotalValue: function(total, length) {
        console.log(`truncate: ${total}`);
        console.log(`length: ${length}`);
        let totalString = total.toString();
        return (totalString.substr(0, this.maxChar).includes('.')) ? 
            totalString.substr(0, this.maxChar) :
            `${Math.round(total / Math.pow(10, length - this.maxChar + 3))}e${length - this.maxChar + 3}`;
    },
};

// DOM Manipulation
calculator.calcBody.addEventListener('click', function(e) {
    let btn = e.target;
    let isAtMaxLength = calculator.bottomText.textContent.length === calculator.maxChar;
    if (calculator.total === 'Oops, can\'t do that.') {
        calculator.resetVariables();
        calculator.clearBottomScreen();
        calculator.clearTopScreen();
    }
    if (btn.className === 'number' && !isAtMaxLength)
        calculator.drawBottomScreen(btn);
    else if (btn.id === 'decimal' && !isAtMaxLength && !calculator.decimal) {
        calculator.decimal = true;
        calculator.decimalButton.className = 'disabled';
        calculator.drawBottomScreen(btn);
    }
    else if (btn.className === 'operator') {
        if (calculator.operator === '=') calculator.clearTopScreen();
        calculator.evaluate(btn);
    }
    else calculator.useOtherOperation(btn);
});