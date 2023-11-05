document.addEventListener("DOMContentLoaded", function () {
    var eventCalllback = function (e) {
        var el = e.target,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7 ___ ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        ///value пустой, если не соответствует заданной длине
        // if (clearVal !== 'false' && e.type === 'blur') {
        //     if (val.length < matrix.match(/([\_\d])/g).length) {
        //         e.target.value = '';
        //         return;
        //     }
        // }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    var phone_input = document.getElementById('phone-input');
    for (let elem of [phone_input]) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
    var name = document.getElementById('name-input');
    var surname =     document.getElementById('surname-input');
    var email =     document.getElementById('email-input');
    var phone =     document.getElementById('phone-input');
    var inn =     document.getElementById('INN-input');
    for (let ev of ['input', 'blur', 'focus']) {
        name.addEventListener(ev, (e) => validateName(e.target.id));
    }
    for (let ev of ['input', 'blur', 'focus']) {
        surname.addEventListener(ev, (e) => validateSurname(e.target.id));
    }

    for (let ev of ['input', 'blur', 'focus']) {
        email.addEventListener(ev, (e) => validateEmail(e.target.id));
    }

    for (let ev of ['input', 'blur', 'focus']) {
        phone.addEventListener(ev, (e) => validatePhone(e.target.id));
    }

    for (let ev of ['input', 'blur', 'focus']) {
        inn.addEventListener(ev, (e) => validateINN(e.target.id));
    }
    /////////////прослушивание событий svg////////////////////////
//     var svgElement = document.getElementsByClassName('to_favorite');
//     svgElement.addEventListener('mouseover', function() {
//         svgElement.setAttribute('fill', '#CB11AB');
//         svgElement.setAttribute('stroke', '#CB11AB');
//     });
// // Обработчик события при уходе с SVG
//     svgElement.addEventListener('mouseout', function() {
//         svgElement.setAttribute('fill', 'black');
//     });

});

let checkName = true;
let checkSurname = true;
let checkEmail = true;
let checkPhone = true;
let checkINN = true;

function renderError(target){
    if (target.id === 'name-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Укажите имя'
    }
    if (target.id === 'surname-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Укажите фамилию'
    }
    if (target.id === 'email-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Проверьте адрес электронной почты'
    }
    if (target.id === 'phone-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Формат: +9 999 999 99 99'
    }
    if (target.id === 'INN-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Формат: 1234567'
    }
    target.style.borderBottom = '1px solid #F55123'
    target.nextElementSibling.nextElementSibling.style.display = 'inline-block'
}
function renderErrorMiss(target){
    console.log(target)
    if (target.id === 'name-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Укажите имя'
    }
    if (target.id === 'surname-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Укажите фамилию'
    }
    if (target.id === 'email-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Укажите электронную почту'
    }
    if (target.id === 'phone-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Укажите номер телефона'

    }
    if (target.id === 'INN-input'){
        target.nextElementSibling.nextElementSibling.innerHTML = 'Укажите ИНН'
    }
    target.style.borderBottom = '1px solid var(--gray-blue)'
    target.nextElementSibling.nextElementSibling.style.display = 'none'
}

function validateName (id){
    let target = document.getElementById(id);
    if(!target.value.match("^[a-zA-Zа-яА-Я]+$") && target.value){
        renderError(target)
        if (checkName) {
            target.addEventListener('keyup', validateName)
            checkName = false
        }
    }
    if (target.value.match("^[a-zA-Zа-яА-Я]+$") || !target.value){
        checkName = true
        target.removeEventListener('keyup', validateName)
        renderErrorMiss(target)
    }
}
function validateSurname (id){
    let target = document.getElementById(id);
    if(!target.value.match("^[a-zA-Zа-яА-Я]+$") && target.value){
        renderError(target)
        if (checkSurname) {
            target.addEventListener('keyup', validateSurname)
            checkSurname = false
        }
    }
    if (target.value.match("^[a-zA-Zа-яА-Я]+$") || !target.value){
        checkSurname = true
        target.removeEventListener('keyup', validateSurname)
        renderErrorMiss(target)
    }
}

function validateEmail(id){
    let target = document.getElementById(id);
    let emailCheck = target.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!emailCheck && target.value){
        renderError(target)
        if (checkEmail) {
            target.addEventListener('keyup', validateEmail)
            checkEmail = false
        }
    }
    if (emailCheck || !target.value){
        checkEmail = true
        target.removeEventListener('keyup', validateEmail)
        renderErrorMiss(target)
    }
}

function validatePhone(id){
    let target = document.getElementById(id);
    let phoneCheck = target.value
    console.log(phoneCheck.length)
    if(phoneCheck.length < 16 && target.value){
        renderError(target)
        if (checkPhone) {
            target.addEventListener('keyup', validatePhone)
            checkPhone = false
        }
    }
    if (phoneCheck.length === 16 || !target.value){
        checkPhone = true
        target.removeEventListener('keyup', validatePhone)
        renderErrorMiss(target)
    }
}

function validateINN(id){
    let target = document.getElementById(id);
    let INNCheck = target.value
    if(!INNCheck.match(/^\d{14}$/) && target.value){
        renderError(target)
        if (checkINN) {
            target.addEventListener('keyup', validateINN)
            checkINN = false
        }
    }
    if (INNCheck.match(/^\d+$/) || !target.value){
        checkINN = true
        target.removeEventListener('keyup', validateINN)
        renderErrorMiss(target)
    }
}

function checkForm(){
    let checkInputs = [checkName, checkSurname, checkEmail, checkPhone, checkINN]
    let form = document.getElementById('recipient-inputs')
    let ckeck = true
    let checkAll = true
    for (let i = 0; i < form.childElementCount; i++){
        let div = form.children[i]
        for (let j = 0; j < div.childElementCount; j++){
            let input = div.children[j].children[0]
            if (!input.value) {
                ckeck = false;
                renderErrorMiss(input)
                input.nextElementSibling.nextElementSibling.style.display = 'block'
                input.style.borderBottom = '1px solid #F55123'
                input.scrollIntoView({block: "center", behavior: "smooth"})
            }
        }
    }
    checkInputs.forEach(el =>{
        if (!el){
            checkAll = false
        }
    })
    // if (sum > 0 && ckeck && checkAll){
    if (ckeck && checkAll){
        alert('Заказ уже оформлен!!!!')
    }
}