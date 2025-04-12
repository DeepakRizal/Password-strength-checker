const inputBox = document.querySelector(".input-box");
const checkStrength = document.querySelector(".check-strength");
const passwordBox = document.querySelector(".password-box");
const passwordSuccessMessage = document.querySelector(
  ".password-success-message"
);
const strengthMeter = document.querySelector(".strength-meter");

function resetError() {
  const errorDiv = document.querySelector(".error");

  if (errorDiv) {
    errorDiv.remove();
  }
}

function resetSuccesMessage() {
  const succesPara = document.querySelector(".password-success-message");

  succesPara.textContent = "";
}

function checkIsPasswordIsValid(password) {
  const checkLength = password.length >= 8;
  const checkSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return checkLength && checkSpecialCharacter && hasCapitalLetter && hasNumber;
}

function generateError() {
  const paragraph = document.createElement("div");
  paragraph.classList.add("error");
  paragraph.textContent =
    "password should be minimum 8 of characters, there should be a capital letter, there should be a special character, there should be a number,";
  passwordBox.appendChild(paragraph);
}

function calculatePasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[\d]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  return score;
}

function updateStrengthMeter(score) {
  strengthMeter.innerHTML = "";

  const strengthBar = document.createElement("div");
  strengthBar.classList.add("strength-bar");

  let color = "";
  let width = "";

  switch (score) {
    case 1:
      color = "red";
      width = "25%";
      break;
    case 2:
      color = "orange";
      width = "50%";
      break;
    case 3:
      color = "yellowgreen";
      width = "75%";
      break;
    case 4:
      color = "green";
      width = "100%";
      break;
    default:
      color = "transparent";
      width = "0%";
  }
  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;

  strengthMeter.appendChild(strengthBar);
}

inputBox.addEventListener("input", (e) => {
  resetError();

  const score = calculatePasswordStrength(e.target.value);
  updateStrengthMeter(score);

  if (!checkIsPasswordIsValid(e.target.value)) {
    resetSuccesMessage();
    generateError();
  }
});

checkStrength.addEventListener("click", () => {
  resetError();
  if (checkIsPasswordIsValid(inputBox.value)) {
    passwordSuccessMessage.textContent =
      "Congratulations! you can go ahead with this password!";
  } else {
    generateError();
  }
});
