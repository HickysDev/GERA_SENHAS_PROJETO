//! Selecao de Elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

/* Novas funcionalidades */
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-options"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPassword = document.querySelector("#copy-password");

//! Funcoes

const generatePassword = (
  getLetterLowCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  const passwordLength = +lengthInput.value;

  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowCase, getLetterUpperCase);
  }
  if (numbersInput.checked) {
    generators.push(getNumber);
  }
  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    return;
  }
  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
  console.log(password);
};

// Letras, Numeros e simbolos
const getLetterLowCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};
const getSymbol = () => {
  const symbols = "{}()[]=+-_*&%$#@!<>?/;:.,~^`";
  return symbols[Math.floor(Math.random() * symbols.length)];
};
//! Eventos

generatePasswordButton.addEventListener("click", () => {
  generatePassword(getLetterLowCase, getLetterUpperCase, getNumber, getSymbol);
});

openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPassword.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPassword.innerText = "Senha copiada!";

    setTimeout(() => {
        copyPassword.innerText = "Copiar";
    }, 1000)
  })
});
