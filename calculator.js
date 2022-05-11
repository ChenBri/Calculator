class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.updateDisplay();
    }

    // Clear operands & set font to default
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined
        $('#current-operand').css('font-size', '2.5em');
        $('#previous-operand').css('font-size', '2.5em');
    }

    // Delete last character
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // Add a number to currentOperand
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Check which operation was clicked & compute (2 Arguments)
    chooseOperation(operation) {
        if (this.currentOperand == '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Check which operation was clicked & compute (1 Argument)
    singleOperation(singleoperation) {
        this.singleoperation = singleoperation;
        if (this.previousOperand !== '') return
        if (this.currentOperand !== '') {
            this.singleCompute();
        }
        this.singleoperation = singleoperation;

    }

    singleCompute() {
        // Compute a single number
        let singleResult = 0;
        const singleCurrent = parseFloat(this.currentOperand);
        if (isNaN(singleCurrent)) return

        console.log(this.singleoperation)
        switch (this.singleoperation) {
            case '√':
                singleResult = Math.sqrt(singleCurrent);
                break;

            case 'sin':
                singleResult = Math.sin(singleCurrent);
                break;

            case 'cos':
                singleResult = Math.cos(singleCurrent);
                break;

            case 'tan':
                singleResult = Math.tan(singleCurrent);
                break;

            case 'abs':
                singleResult = Math.abs(singleCurrent);
                break;
            case 'floor':
                singleResult = Math.floor(singleCurrent);
                break;
            case 'ceil':
                singleResult = Math.ceil(singleCurrent);
                break;
            case 'e^x-1':
                singleResult = Math.expm1(singleCurrent);
                break;
            case 'Dice':
                singleResult = Math.floor(Math.random() * 6) + 1;
                break;

            case 'log':
                singleResult = Math.log(singleCurrent);
                break;
            case 'log2':
                singleResult = Math.log2(singleCurrent);
                break;
            case 'log10':
                singleResult = Math.log10(singleCurrent);
                break;
            case 'trunc':
                singleResult = Math.trunc(singleCurrent);
                break;
            case 'atanh':
                singleResult = Math.atanh(singleCurrent);
                break;
        }

        this.currentOperand = parseFloat(singleResult.toFixed(5));
        this.operation = undefined;
        this.previousOperand = '';

    }


    compute() {
        // Compute 2 numbers
        let result;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;

            case '-':
                result = prev - current;
                break;

            case '×':
                result = prev * current;
                break;

            case '÷':
                result = prev / current;
                break;

            case '^':
                result = Math.pow(prev, current);
                break;

        }
        this.currentOperand = parseFloat(result.toFixed(5));
        this.operation = undefined;
        this.previousOperand = '';
    }

    playAnimationRight() {
        if (right_animation_active == true) {
            document.getElementById('right_panel').style.animation = "spin1 2s linear forwards";
            right_animation_active = false;
            console.log("test")
            return;
        } else {
            document.getElementById('right_panel').style.animation = "spin2 2s linear forwards";
            right_animation_active = true;
            console.log("test")
        }

    }

    playAnimationLeft() {
        if (left_animation_active == true) {
            document.getElementById('left_panel').style.animation = "spin3 2s linear forwards";
            left_animation_active = false;
            console.log("test")
            return;
        } else {
            document.getElementById('left_panel').style.animation = "spin4 2s linear forwards";
            left_animation_active = true;
            console.log("test")
        }

    }

    // Update both displays so Previous Operand will show Current Operand / empty previous operand
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}


// Define variables as buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const newOperation = document.querySelectorAll('[data-singleoperation]');
const playRightAnimation = document.querySelector(['[data-animation-right]']);
const playLeftAnimation = document.querySelector(['[data-animation-left]']);

// Create New Calcilator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
const calculator2 = new Calculator(previousOperandTextElement, currentOperandTextElement);


// Create Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        console.log(e)
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButtons.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButtons.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

newOperation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.singleOperation(button.innerText);
        calculator.updateDisplay();
    })
})


playRightAnimation.addEventListener('click', () => {
    calculator.playAnimationRight();
})


playLeftAnimation.addEventListener('click', () => {
    calculator.playAnimationLeft();
})

// Change Font Size depending on the length of the operand
$('*').on('click', function (e) {

    var that = $('#current-operand'),
        that2 = $('#previous-operand'),
        textLength = calculator.currentOperandTextElement.innerText.length;

    if (textLength > 36) {
        that.css('font-size', '0.75em');
        that2.css('font-size', '0.5em');
    } else if (textLength > 24) {
        that.css('font-size', '1em');
        that2.css('font-size', '0.75em');
    } else if (textLength > 18) {
        that.css('font-size', '1.5em');
        that2.css('font-size', '1.25em');
    } else if (textLength > 14) {
        that.css('font-size', '2em');
        that2.css('font-size', '1.75em');
    } else if (textLength > 11) {
        that.css('font-size', '2.5em');
        that2.css('font-size', '2.25em');
    }
});



// Make the calculator draggable
// Reference the draggable item and his container
var dragItem = document.querySelector("#background");
var container = document.querySelector("body");
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

// Check if the mouse is being used
container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {

    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    active = false;

}

function drag(e) {
    if (active) {

        e.preventDefault();

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);

    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// Disable Scrolling
window.onscroll = function () {
    window.scrollTo(0, 0);
};


// Generate a random number & Change background's color
$('#background').on('click', function (e) {

    let randR = Math.floor(Math.random() * 255) + 1; // R
    let randG = Math.floor(Math.random() * 255) + 1; // G
    let randB = Math.floor(Math.random() * 255) + 1; // B
    
    let min = Math.ceil(3);
    let max = Math.floor(7);
    let randomOpacity = (Math.floor(Math.random() * (max - min) + min)) / 10; // Opacity

    let randRGB = `rgb(${randR},${randG},${randB}, ${randomOpacity})`;

    document.getElementById('circles').style.setProperty('--circle_color', randRGB);
    document.getElementById('right_panel').style.zIndex = "-1";
    document.getElementById('area').style.zIndex = "-1";

})

// Animation Manager
var right_animation_active = true;
var left_animation_active = true;




// Start with the default theme
document.getElementById("theme").setAttribute("href", `themes/default.css`)


//Theme Selector
function selectTheme(){
    const themeSelect = document.getElementById("themeSelect");
    const themeStyleheetLink = document.getElementById("theme");

    function activateTheme(themeName){
        themeStyleheetLink.setAttribute("href", `themes/${themeName}.css`)
    }

    themeSelect.addEventListener("change", ()=>{
        activateTheme(themeSelect.value);
    });
}

selectTheme();


// Random jQuery Testing
// $("body").css("background","red");
