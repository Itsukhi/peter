// declaración de variables
let email = "";
let name = "";
let lastname = "";
let phone = "";
let password = "";
let user = {};

// método para capitalizar una palabra
const wordToCapitalize = word => {
    let toCapitalize = null;
    if (word !== null && word !== undefined && word.length > 0) {
        toCapitalize = word[0].toUpperCase() + word.slice(1);
    }
    return toCapitalize;
};

// método para construir datos para enviar al servidor
const buildUserDataForRequest = data => {
    let userData = null;

    if (data !== null && data !== undefined) {
        userData = {
            email: data.email,
            firstname: data.name,
            last_name: data.lastName,
            phone: `${COUNTRY_CODE}${data.phone}`,
            password: data.password
        };
    }
    return userData;
};

const getDataFormMyForm = () => {
    // cargar datos del formulario HTML
    const floatingInputemail = document.getElementById("floatingInputemail").value;
    const floatingInputname = document.getElementById("floatingInputname").value;
    const floatingInputlastname = document.getElementById("floatingInputlastname").value;
    const floatingInputphone = document.getElementById("floatingInputphone").value;
    const floatingInputpass = document.getElementById("floatingpass").value;

    // sanear datos
    email = floatingInputemail;
    name = wordToCapitalize(floatingInputname);
    lastname = wordToCapitalize(floatingInputlastname);
    phone = floatingInputphone;
    password = floatingInputpass;

    // preparar para enviar
    user = buildUserDataForRequest({name: name, lastName: lastname, phone: phone, password: password, email: email});
};

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el formulario
    var form = document.querySelector('.needs-validation');

    // Escucha el evento 'submit' del formulario
    form.addEventListener('submit', function (event) {
        // Detiene el envío del formulario por defecto
        event.preventDefault();

        // Validación de campos
        var emailInput = document.getElementById('validationemail');
        var nameInput = document.getElementById('validationname');
        var lastnameInput = document.getElementById('validationCustomlastname');
        var phoneInput = document.getElementById('validationphone');
        var passwordInput = document.getElementById('validationpassword');
        var checkBox = document.getElementById('invalidCheck3');

        var isValid = true;

        // Verifica si el campo de email está vacío
        if (emailInput.value.trim() === '') {
            isValid = false;
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }

        // Verifica si el campo de nombre contiene números
        if (/\d/.test(nameInput.value)) {
            isValid = false;
            nameInput.classList.add('is-invalid');
        } else {
            nameInput.classList.remove('is-invalid');
        }

        // Verifica si el campo de apellido está vacío
        if (lastnameInput.value.trim() === '') {
            isValid = false;
            lastnameInput.classList.add('is-invalid');
        } else {
            lastnameInput.classList.remove('is-invalid');
        }

        // Verifica si el campo de teléfono es válido
        if (phoneInput.value.length < 3 || phoneInput.value.length > 10) {
            isValid = false;
            phoneInput.classList.add('is-invalid');
        } else {
            phoneInput.classList.remove('is-invalid');
        }

        // Verifica si el campo de contraseña está vacío
        if (passwordInput.value.trim() === '') {
            isValid = false;
            passwordInput.classList.add('is-invalid');
        } else {
            passwordInput.classList.remove('is-invalid');
        }

        // Verifica si la casilla de verificación está marcada
        if (!checkBox.checked) {
            isValid = false;
            checkBox.classList.add('is-invalid');
        } else {
            checkBox.classList.remove('is-invalid');
        }

        // Si todos los campos son válidos, envía el formulario
        if (isValid) {
            form.submit();
        }
    });
});

