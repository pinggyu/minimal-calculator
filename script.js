// TO DO: chained operations
// resutls screen: display current num typed by digit, result
// operations screen: display first num after operator chosen + display operator + display second num after = is typed and display = 
// limit num of digits displayed in operations screen
// fix bug where second num is limited in terms of digits 

// initialize namespace object
const app = {};

const MAX_DIGITS_DISPLAYED = 20;

app.displayValue = '';
app.firstNum = 0;
app.secondNum = 0;
app.operationResult = 0;
app.currentOperator = '';
app.equalBtn = document.getElementById('calcCompute');
app.resultDisplay = document.getElementById('resultScreen');
app.operationDisplay = document.getElementById('operationScreen');
app.clearBtn = document.getElementById('clearBtn');

app.init = function() {
    app.getNums();
    app.checkModifier();
    app.checkOperator();
    app.checkCompute();
    app.checkClear();
}

app.checkModifier = function() {
    document.querySelectorAll('.calcModifier').forEach(btn => btn.addEventListener('click', function(e){
        let numModifier = btn.textContent;
        console.log(btn.textContent);
        app.displayValue = app.modifier(numModifier,app.displayValue)
        app.displayOperation();
    }));    
}

app.modifier = function(modifier, num){
    console.log(modifier);
    switch(modifier) {
        case '+/-':
            return -num;
        case '%':
            return num/100;
        case '.':
            return num + '.';
    }
}

app.operate = function(operator, num1, num2){
    switch(operator) {         
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
        if (num2 === 0){
            alert('Division by zero is undefined!'); 
            break;
        } else {
            return num1 / num2; 
        };
    }
}

app.checkCompute = function() {
    app.equalBtn.addEventListener('click', function(e){
        app.secondNum = parseFloat(app.displayValue);
        app.firstNum = parseFloat(app.firstNum);
        app.operationResult = app.operate(app.currentOperator, app.firstNum, app.secondNum);
        app.displayOperation();
        app.displayResult();
    })
}

app.checkOperator = function(){
    document.querySelectorAll('.calcOperator').forEach(btn => btn.addEventListener('click', function(e){
        app.currentOperator = btn.textContent;
        app.firstNum = app.displayValue;
        app.displayOperation();
    }));
}

app.getNums = function() {    
    document.querySelectorAll('.numBtn').forEach(btn => btn.addEventListener('click', function(e){
        if (app.displayValue === app.firstNum){
            app.displayValue = '';
        }
        if (app.displayValue.length < MAX_DIGITS_DISPLAYED) {
            app.displayValue += btn.textContent;
            app.displayOperation();
        } else {
            alert('Max number of digits entered!');
        }
    })); 
}

app.displayOperation = function(){
    app.resultDisplay.textContent = '';
    app.resultDisplay.textContent = `${app.displayValue}`;
    if (app.currentOperator && !app.secondNum) {
         app.operationDisplay.textContent = `${app.firstNum} ${app.currentOperator}`
    } else if (app.currentOperator && app.secondNum) {
        app.operationDisplay.textContent = `${app.firstNum} ${app.currentOperator} ${app.secondNum}`
    }
}

app.displayResult = function(){
    app.resultDisplay.textContent = '';
    app.resultDisplay.textContent = `${app.operationResult}`;
}

app.checkClear = function() {
    app.clearBtn.addEventListener('click', function(e){
        app.operationDisplay.textContent = '';
        app.resultDisplay.textContent = '';
        app.displayValue = '';
        app.firstNum = 0;
        app.secondNum = 0;
        app.operationResult = 0;
        app.currentOperator = '';

    })
}

app.init();
