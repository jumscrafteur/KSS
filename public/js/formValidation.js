const logInForm = document.querySelector("#logIn")
const registerForm = document.querySelector("#register")
const email = document.querySelector("#email")
const pseudo = document.querySelector("#pseudo")
const password1 = document.querySelector("#password1")
const password2 = document.querySelector("#password2")

if (logInForm)
  logInForm.addEventListener("submit", (e) => {

    let password = e.target[1].value
    // if (!(password.match(/[0-9]/g) && password.match(/[a-z]/g) && password.length >= 10)) {
    //   e.preventDefault()
    // }
    let pseudo = e.target[0].value
    // if (!(pseudo != null && pseudo.length > 0)) {
    //   e.preventDefault()
    // }
  })

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    if (!(email.value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/))) {
      e.preventDefault()
    }

    let pseudoVal = pseudo.value
    if (!(pseudoVal != null && pseudoVal.length > 0)) {
      e.preventDefault()
    }

    let passwordVal = password1.value
    let password2Val = password2.value
    if (!(passwordVal.match(/[0-9]/g) && passwordVal.match(/[A-Za-z]/g) && passwordVal.length >= 8 && passwordVal == password2Val)) {
      e.preventDefault()
    }
  })

  email.addEventListener("input", () => {
    if (email.value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
      email.classList.remove("invalid")
    } else {
      email.classList.add("invalid")
    }
  })

  password1.addEventListener("input", () => {
    if (!(password1.value.match(/[0-9]/g) && password1.value.match(/[a-zA-Z]/g) && password1.value.length >= 8)) {
      password1.classList.add("invalid")
    } else {
      password1.classList.remove("invalid")
    }
    if (password2.value != password1.value) {
      password2.classList.add("invalid")
    } else {
      password2.classList.remove("invalid")
    }
  })

  password2.addEventListener("input", () => {
    if (password2.value != password1.value) {
      password2.classList.add("invalid")
    } else {
      password2.classList.remove("invalid")
    }
  })
}