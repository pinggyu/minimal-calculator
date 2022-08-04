// STRETCH GOALS:
// fix bug when entering numbers directly after evaluating a result
// add backspace button
// add keyboard support 

// initialize namespace object
const app = {};

const MAX_DIGITS_DISPLAYED = 14;

app.displayValue = '';
app.firstOperand = '';
app.secondOperand = '';
app.operationResult = '';
app.currentOperator = '';
app.equalBtn = document.getElementById('calcCompute');
app.currentDisplay = document.getElementById('resultScreen');
app.currentDisplay.textContent = '0';
app.previousDisplay = document.getElementById('operationScreen');
app.clearBtn = document.getElementById('clearBtn');

app.init = function() {
    app.getNums();
    app.checkModifier();
    app.checkOperator();
    app.checkCompute();
    app.checkClear();
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
            // disable the decimal button if there’s already one in the display
            if (num.includes('.')){
                return num;
            } else{
                return num + '.';
            }  
    }
}

app.displayOperation = function(){
    app.currentDisplay.textContent = '';
    app.currentDisplay.textContent = `${app.displayValue}`;
    app.previousDisplay.textContent = `${app.firstOperand} ${app.currentOperator} ${app.secondOperand}`
}

app.displayResult = function() {
    app.currentDisplay.textContent = '';
    app.currentDisplay.textContent = `${app.displayValue}`;
    app.previousDisplay.textContent = `${app.firstOperand} ${app.currentOperator} ${app.secondOperand} =`
}

app.checkCompute = function() {
    app.equalBtn.addEventListener('click', app.handleCompute);
}

app.handleCompute = function() {
    // if = is pressed before second num is provided after operator (displayvalue is reset after first num is stored so empty display value = no second num entered), then just display first num
    if (!app.displayValue) {
        app.currentDisplay.textContent = '';
        app.currentDisplay.textContent = `${app.firstOperand}`;
    // if = is pressed before operator is provided, just keep showing current displayValue
    } else if (app.currentOperator === '') {
        app.currentDisplay.textContent = '';
        app.currentDisplay.textContent = `${app.displayValue}`;
    } else {
        app.firstOperand = parseFloat(app.firstOperand);
        app.secondOperand = parseFloat(app.displayValue);
        app.operationResult = '';
        app.operationResult = app.operate(app.currentOperator,app.firstOperand,app.secondOperand);
        app.displayValue = app.operationResult;
        app.displayResult();
        app.chainOperation();
        app.currentOperator = '';
    }
}

app.operate = function(operator, num1, num2){
    switch(operator) {         
        case '+':
            return app.add(num1, num2);
        case '-':
            return app.substract(num1, num2);
        case '×':
            return app.multiply(num1, num2);
        case '÷':
            return app.divide(num1, num2); 
    }
}

app.add = function (num1, num2){
    return num1 + num2;
}

app.substract = function (num1, num2){
    return num1 - num2;
}

app.multiply = function (num1, num2){
    return num1 * num2;
}

app.divide = function (num1, num2){
    if (num2 === 0){
        alert('Division by zero is undefined!'); 
        return;
    }
    return num1 / num2;
}

app.checkOperator = function(){
    document.querySelectorAll('.calcOperator').forEach(btn => btn.addEventListener('click', function(e){
        // if there's an active operator, compute the current operation and chain it 
        if (app.currentOperator !== '') {
            app.handleCompute();
            app.chainOperation();
            app.currentOperator = btn.textContent;
            app.displayOperation();
            app.displayValue = '';
        } else {
            app.currentOperator = btn.textContent;
            app.firstOperand = app.displayValue;
            app.displayOperation();
            app.displayValue = '';
        }
    }));
}

app.chainOperation = function() {
    app.firstOperand = app.operationResult;
    app.secondOperand = '';    
}

app.resetCalculator = function() {
    app.previousDisplay.textContent = '';
    app.currentDisplay.textContent = '0';
    app.displayValue = '';
    app.firstOperand = '';
    app.secondOperand = '';
    app.operationResult = '';
    app.currentOperator = '';    
}

app.checkClear = function() {
    app.clearBtn.addEventListener('click', app.resetCalculator)
}

app.init();
