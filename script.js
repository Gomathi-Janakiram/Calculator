
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals-btn");
const periodButton = document.querySelector(".period-btn");
const inputScreen = document.querySelector("#calculation");
const resultBox = document.querySelector(".result");
const clearButton = document.querySelector(".clear-btn");
const deleteButton = document.querySelector(".delete-btn");

const operatorSymbols = ["+", "-", "÷", "x", "%",];


numbers.forEach((button) => 
    button.addEventListener("click", () => appendNumber(button.textContent))
)

operators.forEach((button) => 
    button.addEventListener("click", () => appendOperator(button.textContent))
)

periodButton.addEventListener("click", () => appendPeriod())

equalsButton.addEventListener("click", () => evaluate())

clearButton.addEventListener("click", () => clearScreen())

deleteButton.addEventListener("click", () => deleteInputs())


document.addEventListener("keydown", (e) => {
    const key = e.key == "/" ? "÷" : e.key == "*" ? e.key = "x" : e.key;
    if (key >=0 && key <=9) {
        appendNumber(e.key)
    } else if (operatorSymbols.includes(key)) {
        appendNumber(key)
    } else if (key == ".") {
        appendPeriod()
    } else if (key == "=" || key == "Enter") {
        evaluate()
    } else if (key == "Backspace") {
        deleteInputs()
    }
})

const appendNumber = (content) => {
    if (inputScreen.textContent == "0") {
        inputScreen.textContent = ""
    }
    inputScreen.textContent += content
}

const appendOperator = (operator) => {
    inputScreen.textContent += operator;
}

const splitStringByArrayElements = (str, arr) => {
    let splitResult = [str];

    arr.forEach(element => {
        splitResult = splitResult.flatMap((part) => part.split(element))
    })
    return splitResult
}


const appendPeriod = () => {
    const lastNumber = splitStringByArrayElements(inputScreen.textContent, operatorSymbols).pop();

    if (!lastNumber.includes(".")) {
        inputScreen.textContent += ".";
    }
}

const evaluate = () => {
    if (inputScreen.textContent.includes("÷") && inputScreen.textContent.includes("x")) {
        let calc = inputScreen.textContent.replaceAll("÷", "/");
        calc = calc.replaceAll("x", "*");
        return resultBox.textContent = eval(calc).toFixed(2)
    }
    if (inputScreen.textContent.includes("÷")) {
        const calc = inputScreen.textContent.replaceAll("÷", "/");
        return resultBox.textContent = eval(calc).toFixed(2)
    }
    if (inputScreen.textContent.includes("x")) {
        const calc = inputScreen.textContent.replaceAll("x", "*");
        return resultBox.textContent = eval(calc);
    } else {
        const calc = inputScreen.textContent;
        return resultBox.textContent = eval(calc)
    }   
}

const clearScreen = () => {
    inputScreen.textContent = "0";
    resultBox.textContent = ""
}

const deleteInputs = () => {
    if (resultBox.textContent) {
        clearScreen()
    } else {
        const arrayOfInput = inputScreen.textContent.split("");
        arrayOfInput.pop()
        const string = arrayOfInput.join("");
        if (string == "") {
            inputScreen.textContent = "0"
        } else {
            inputScreen.textContent = string
        }
    }
}