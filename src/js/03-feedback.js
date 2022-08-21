const throttle = require('lodash.throttle');
const KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const formData = {};

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

updateForm();

function updateForm() {
    const saveData = localStorage.getItem(KEY);
        if(saveData) {
            const {email, message} = JSON.parse(saveData);
            // console.log({email, message});
            form.email.value = email;
            form.message.value = message;
            formData.email = email;
            formData.message = message;
        }
}
function onInput() {
   formData.email = form.elements.email.value;
   formData.message = form.elements.message.value;

    localStorage.setItem(KEY, JSON.stringify(formData));
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = event.currentTarget.elements.email.value;
    const message = event.currentTarget.elements.message.value;

    if (!email|| !message) {
        return alert("Заповни всі поля!");
    }

    formData.forEach((value, key) => {
        console.log(` ${key}: ${value}`);
    });

    event.currentTarget.reset();
    localStorage.removeItem(KEY);
}
