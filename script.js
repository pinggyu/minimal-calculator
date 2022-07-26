// initialize namespace object
const app = {
    displayValue: '',
    firstNum: 0,
    secondNum: 0,
    operationResult: 0,
    currentOperator: '',
    equalBtn: document.getElementById('calcCompute'),
    resultDisplay: document.getElementById('resultScreen')
}

app.init = function() {
    app.getNums();
    app.checkOperator();
    app.checkCompute();
}

app.reverseSign = function(num){
    return -num;
}

app.percentage = function(num){
    return num / 100;
}

app.add = function(num1, num2) {
  return num1 + num2;
};

// app.sum = function(numsArray) {
//     const sum = numsArray.reduce((partialSum, i) => partialSum + i, 0);
//     return sum;
// };

app.subtract = function(num1, num2) {
	return num1 - num2;
};

app.multiply = function(num1, num2) {
  return num1 * num2;
};

app.divide = function(num1, num2) {
    if (num2 === 0){
        return 'Undefined'; 
    } else {
        return num1 / num2; 
    }
};

app.operate = function(operator, num1, num2){
    switch(operator) {         
        case '+':
            return app.add(num1, num2);
        case '-':
            return app.subtract(num1, num2);
        case '×':
            return app.multiply(num1, num2);
        case '÷':
            return app.divide(num1, num2);
    }
}

app.checkCompute = function() {
    app.equalBtn.addEventListener('click', function(e){
        app.secondNum = parseInt(app.displayValue);
        app.firstNum = parseInt(app.firstNum);
        app.operationResult = app.operate(app.currentOperator, app.firstNum, app.secondNum);
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
        app.displayValue += btn.textContent;
        app.displayOperation();
    }));
}

app.displayOperation = function(){
    app.resultDisplay.textContent = '';
    app.resultDisplay.textContent = `${app.displayValue}`;
}

app.displayResult = function(){
    app.resultDisplay.textContent = '';
    app.resultDisplay.textContent = `${app.operationResult}`;
}

app.init();
