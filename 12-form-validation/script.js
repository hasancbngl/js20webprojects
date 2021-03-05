const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;
let messageContent= '';

const changeStyle = (color, messageContent) => {
    message.textContent = messageContent;
    message.style.color = color;
    messageContainer.style.borderColor = color;
    password1El.style.borderColor = color;
    password2El.style.borderColor = color;
}

const validateForm = () => {
    //using Constraint API
    isValid = form.checkValidity();
    //style Main message error
    if(!isValid) {
   messageContent = "Please Fill Out All the Fields!";
   changeStyle('red', messageContent);
   return;
    }
    //Check if passwords match
    if(password1El.value === password2El.value) {
        passwordsMatch = true;
        messageContent = "Passwords match!";
        changeStyle('blue', messageContent);
    } else {
        passwordsMatch = false;
        messageContent = "Passwords should match!";
        changeStyle('red', messageContent);
        return;
    }
    //if form is valid and password match
    if(isValid && passwordsMatch) {
        messageContent = "Successfully Registered!";
        changeStyle('blue', messageContent);
    }
};

const storeFormData = () => {
    const user = {
        name: form.name.value,
        email: form.email.value,
        website : form.website.value,
        phone : form.phone.value,
        password: form.password.value
    };
    //user data
    console.log(user);
};

const processFormData = e => {
    e.preventDefault();
    validateForm();
    //submit data if is valid
    if(isValid && passwordsMatch) storeFormData();
};

//Event Listener
form.addEventListener('submit', processFormData);