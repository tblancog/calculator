const inputElement = document.querySelector(".input");
const inputs = [];

const onChange = (event) => {
  const inputValue = event.target.value;
  const numericValue = inputValue.replace(/[^0-9.]/g, "");
  inputElement.value = numericValue;
};

const calculate = (inputs) => {
  const result = Number(eval(inputs.join("")));
  if (result === NaN) {
    throw Error("Error!");
  } else if (result === -Infinity || result === Infinity) {
    throw Error("Division by zero");
  }
  return result;
};

const isOperator = (key) => ["+", "-", "*", "/"].includes(key);

const onButtonPressed = (event) => {
  event.preventDefault();
  const buttonValue = event.target.innerText;
  if (isOperator(buttonValue)) {
    inputs.push(parseFloat(inputElement.value));
    inputs.push(buttonValue);
    inputElement.value = "";
    return;
  } else if (buttonValue === "=") {
    inputs.push(parseFloat(inputElement.value));
    inputElement.value = calculate(inputs);
    inputs.length = 0;
    return;
  } else if (buttonValue === "C") {
    inputElement.value = "";
    inputs.length = 0;
    return;
  }
  inputElement.value += buttonValue;
};

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", onButtonPressed);
});

document.addEventListener("keypress", (e) => {
  e.preventDefault();
  if (!isNaN(e.key)) {
    const numericValue = e.key.replace(/[^0-9.]/g, "");
    inputElement.value += Number(numericValue);
  }
});
