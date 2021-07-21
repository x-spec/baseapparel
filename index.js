
function handleForm(event) {
    event.preventDefault()
    let formData = new FormData(event.target)
    for (let entry of formData.entries()) {
        let entryName = entry[0]
        let entryValue = entry[1]

        if (isValueEmpty(entryValue)) {
            setFormResponse(entryName, false, `${capitalizeFirstLetter(entryName)} field cannot be empty`)
            continue
        }
        if (entryName === "email") {
            if (isEmailValid(entryValue))
                setFormResponse(entryName, true)
            else
                setFormResponse(entryName, false, `Please provide a valid ${entryName}!`)
        }
    }
}

//check if input value is empty
function isValueEmpty(value) {
    return value.replace(' ', '').length === 0
}

//display error/success result
function setFormResponse(name, isValid, message = "") {
    let input = document.querySelector(`input[name='${name}']`)
    let formGroup = input.parentElement
    resetInputStyle(formGroup)
    if (!isValid) {
        formGroup.classList.add("invalid")
        let errorMsg = input.nextElementSibling
        errorMsg.textContent = message  //set error message content
    }
    else
        formGroup.classList.add("valid")
}

//remove valid/invalid class name
function resetInputStyle(formGroup) {
    formGroup.classList.remove(formGroup.classList[1])
}

//capitalize first letter
capitalizeFirstLetter = (word) => {
    return word[0].toUpperCase() + word.slice(1)
}

//check if email is valid/properly formatted
function isEmailValid(email) {
    let regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regexExp.test(email)
}


let form = document.querySelector(".hero__form")
form.addEventListener("submit", handleForm)