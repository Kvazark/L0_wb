

function togglePaymentMessage() {
    var checkbox = document.getElementById("write-off-immediately");
    var titleBtn = document.getElementById("name-order-button");
    var paymentMessage = document.getElementById("payment-message");

    if (checkbox.checked) {
        paymentMessage.style.display = "none";
        titleBtn.innerHTML = "Оплатить 1 016 сом";
    } else {
        paymentMessage.style.display = "block";
        titleBtn.innerHTML = "Заказать";
    }
}