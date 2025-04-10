const inputBox = document.querySelector(".input-box");
const checkStrength = document.querySelector(".check-strength");
const passwordBox = document.querySelector(".password-box");
const passwordSuccessMessage = document.querySelector(
  ".password-success-message"
);

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

inputBox.addEventListener("input", (e) => {
  resetError();
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
