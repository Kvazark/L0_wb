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
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
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
});

const phoneInput = document.getElementById('phone-input');



let checkName = true;
function validateName (id){
    name = name || id
    let target = document.getElementById(name);
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
function renderError(target){
    if (target.id === 'email-input'){
        target.nextElementSibling.innerHTML = 'Проверьте адрес электронной почты'
    }
    if (target.id === 'phone-input'){
        target.nextElementSibling.innerHTML = 'Формат: +9 999 999 99 99'
    }
    if (target.id === 'INN-input'){
        target.nextElementSibling.innerHTML = 'Формат: 1234567'
    }
    target.style.borderBottom = '1px solid #F55123'
    target.style.color = '#F55123'
    target.nextElementSibling.style.display = 'inline-block'
}
function renderErrorMiss(target){
    if (target.id === 'email-input'){
        target.nextElementSibling.innerHTML = 'Укажите электронную почту'
    }
    if (target.id === 'phone-input'){
        target.nextElementSibling.innerHTML = 'Укажите номер телефона'
    }
    if (target.id === 'INN-input'){
        target.nextElementSibling.innerHTML = 'Укажите ИНН'
    }
    target.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)'
    target.style.color = 'black-input'
    target.nextElementSibling.style.display = 'none'
}