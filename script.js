// initialize namespace object
const app = {};

const MAX_DIGITS_DISPLAYED = 14;

app.displayValue = '';
app.firstNum = '';
app.secondNum = '';
app.operationResult = '';
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
        app.displayValue = app.modifier(numModifier,app.displayValue)
        app.displayOperation();
    }));    
}

app.modifier = function(modifier, num){
    switch(modifier) {
        case '+/-':
            // converted to string since app.displayValue.length is used to determine whether current input overflows screen
            return (-num).toString();
        case '%':
            return (num/100).toString();
        case '.':
            return num + '.';
    }
}

app.displayOperation = function(){
    app.resultDisplay.textContent = '';
    app.resultDisplay.textContent = `${app.displayValue}`;
    app.operationDisplay.textContent = `${app.firstNum} ${app.currentOperator} ${app.secondNum}`
}

app.displayResult = function() {
    app.resultDisplay.textContent = '';
    app.resultDisplay.textContent = `${app.displayValue}`;
    app.operationDisplay.textContent = `${app.firstNum} ${app.currentOperator} ${app.secondNum} =`
}

app.checkCompute = function() {
    app.equalBtn.addEventListener('click', function(e){
        app.operationResult = 0;
        app.secondNum = parseFloat(app.displayValue);
        app.firstNum = parseFloat(app.firstNum);
        app.operationResult = app.operate();
        app.displayValue = app.operationResult;
        app.displayResult();
        app.chainOperation();
    })
}

app.chainOperation = function() {
    app.firstNum = app.operationResult;
    app.secondNum = '';    
}

app.operate = function(){
    switch(app.currentOperator) {         
        case '+':
            return app.firstNum + app.secondNum;
        case '-':
            return app.firstNum - app.secondNum;
        case '×':
            return app.firstNum * app.secondNum;
        case '÷':
        if (app.secondNum === 0){
            alert('Division by zero is undefined!'); 
            break;
        } else {
            return app.firstNum / app.secondNum; 
        };
    }
}

app.checkOperator = function(){
    document.querySelectorAll('.calcOperator').forEach(btn => btn.addEventListener('click', function(e){
        app.currentOperator = btn.textContent;
        app.firstNum = app.displayValue;
        app.displayOperation();
        app.displayValue = '';
    }));
}

app.getNums = function() {    
    document.querySelectorAll('.numBtn').forEach(btn => btn.addEventListener('click', function(e){
        if (app.displayValue.length > MAX_DIGITS_DISPLAYED) {
            alert('Max number of digits entered!');
        } else {
            app.displayValue += btn.textContent;
            app.displayOperation();
        }
    })); 
}

app.resetCalculator = function() {
    app.operationDisplay.textContent = '';
    app.resultDisplay.textContent = '';
    app.displayValue = '';
    app.firstNum = '';
    app.secondNum = '';
    app.operationResult = '';
    app.currentOperator = '';    
}

app.checkClear = function() {
    app.clearBtn.addEventListener('click', app.resetCalculator)
}

app.init();
