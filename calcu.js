
const calculator = document.querySelector(".calculator");
const screen = document.form1.textview;
const powerBtn = document.getElementById("powerBtn");
const statusText = document.getElementById("status");
const keypad = document.querySelectorAll(".buttons button");

let isOn = true;

function togglePower() {
  isOn = !isOn;

  if (isOn) {
    calculator.classList.remove("is-off");
    powerBtn.textContent = "⏻ ON";
    statusText.textContent = "● ON";
    screen.value = "";
  } else {
    calculator.classList.add("is-off");
    powerBtn.textContent = "⏻ OFF";
    statusText.textContent = "● OFF";
  }

  keypad.forEach(button => {
    button.disabled = !isOn;
  });
}

function insert(num) {
  if (!isOn) return;

  if (screen.value === "Error") {
    screen.value = "";
  }

  screen.value += num;
  checkEasterEgg();
}

function clearScreen() {
  if (!isOn) return;

  screen.value = "";
  checkEasterEgg();
}

function backspace() {
  if (!isOn) return;

  screen.value = screen.value.slice(0, -1);
  checkEasterEgg();
}

function equal() {
  if (!isOn || !screen.value) return;

  try {
    const expression = screen.value;

    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      throw new Error("Invalid expression");
    }

    const result = Function('"use strict"; return (' + expression + ')')();

    if (!Number.isFinite(result)) {
      throw new Error("Math error");
    }

    screen.value = Number.isInteger(result)
      ? String(result)
      : String(Number(result.toPrecision(10)));

  } catch (error) {
    screen.value = "Error";
  }

  checkEasterEgg();
}

function checkEasterEgg() {
  if (screen.value === "5318008") {
    calculator.classList.add("upside-down");
  } else {
    calculator.classList.remove("upside-down");
  }
}

document.addEventListener("keydown", function(event) {
  if (!isOn) return;

  if (/^[0-9.+\-*/()]$/.test(event.key)) {
    insert(event.key);
  } else if (event.key === "Enter") {
    event.preventDefault();
    equal();
  } else if (event.key === "Backspace") {
    backspace();
  } else if (event.key === "Escape") {
    clearScreen();
  }
});
