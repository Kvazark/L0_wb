let totalPrice = 0;

renderOrder();
calculation();
function togglePaymentMessage() {
    var checkbox = document.getElementById("write-off-immediately");
    var titleBtn = document.getElementById("name-order-button");
    var paymentMessage = document.getElementById("payment-message");

    if (checkbox.checked) {
        paymentMessage.style.display = "none";
        titleBtn.innerHTML = `Оплатить ${totalPrice} сом`;
    } else {
        paymentMessage.style.display = "block";
        titleBtn.innerHTML = "Заказать";
    }
}
function renderOrder(){
    let parent = document.getElementById('cost-of-the-order');
    let childBlock1 = document.createElement('section');
    childBlock1.className = 'price-order-container';
    childBlock1.id = 'price-order-container';
    let childBlock2 = document.createElement('section');
    childBlock2.className = 'delivery-order';
    childBlock2.id='point-courier-order';
    let description;
    if(typeDelivery===typesDelivery[0]) description = 'Доставка в пункт выдачи';
    else description = 'Доставка курьером';
    childBlock2.innerHTML = ` <div class="point-courier-order">
                    <section>
                        <h5>${description}</h5>
                        <img src="src/assets/icons/edit_pencil.svg">
                    </section>
                    <p>${selectedValueAddress.address}</p>
                    <span id="time-delivery-oreder">5–8 фев</span>
                </div>
                <div class="delivery-order-note">
                    <img src="src/assets/icons/price_shipping.svg"/>
                    <p class="description-note-delivery-order">Обратная доставка товаров на склад при отказе — <span>бесплатно</span></p>
                    <div class="popup-info-note-delivery-order"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>
                </div>`;
    let childBlock3 = document.createElement('section');
    childBlock3.className = `paymet-order-details`;
    childBlock3.id='paymet-order-details';
    childBlock3.innerHTML = `
    <div class="paymet-order-details" id="paymet-order-details">
                    <section>
                        <h5>Оплата картой</h5>
                        <img src="src/assets/icons/edit_pencil.svg"/>
                    </section>
                    <div id="select-card-order">
                    <!--                        <img src="src/assets/icons/card_mir.svg">-->
<!--                        <p id="number-select-card">1234 12•• •••• 1234</p>-->
                    </div>
                </div>
                <div class="checkbox-order">
                    <div class="checkbox-block">
                        <input type="checkbox" id="write-off-immediately" name="cart_all" onclick="togglePaymentMessage()">
                        <label for="write-off-immediately"></label>
                        <p style="font-size: 13px;">Списать оплату сразу</p>
                    </div>
                    <span id="payment-message">Спишем оплату с карты при получении</span>
                </div>`;
    parent.append(childBlock1);
    parent.append(childBlock2);
    parent.append(childBlock3);
    renderSelectCard();
}
function calculation(){
    let parent = document.getElementById('price-order-container')
    let words = ['товар', 'товара', 'товаров'];
    let disSum = 0;
    let priceSum = 0;
    let countProducts = 0;
    let totalSum = 0;
    sumProducts.forEach(elem =>{
        if (elem.checked){
            let quantity = elem.quantity;
            let priceProduct = quantity * elem.price;
            let discountPrice = (priceProduct * (100 - (elem.discount + personalData.discount)))/100;
            // discounts = el.discount + personalData.discount;
            priceSum += priceProduct;
            countProducts += quantity
            totalSum += discountPrice
        }
    })
    let discounts = parseInt(priceSum) - parseInt(totalSum);
    let count = normalizeCountForm(countProducts, words);
    totalPrice = parseInt(totalSum);
    console.log(totalPrice,disSum, discounts,countProducts);
    if(parent){
        parent.innerHTML = `<div class="header-price-order">
                    <h2>Итого</h2>
                    <h2>${parseInt(totalSum)} сом</h2>
                </div>
                <section>
                    <div>
                        <p>${countProducts} ${count}</p>
                        <p>${parseInt(priceSum)} сом</p>
                    </div>
                    <div>
                        <p>Скидка</p>
                        <p>−${discounts} сом</p>
                    </div>
                    <div>
                        <p>Доставка</p>
                        <p>Бесплатно</p>
                    </div>
                </section>`
    }
    //getTimeDeliveryTime();
    togglePaymentMessage();
}
// function getTimeDeliveryTime(){
//     let content
//     if (firstDaySum){
//         let time = firstDaySum.split(' ')
//         let month = time[3].substring(0,3)
//         content = time[0] + time[1] + time[2] + ' ' + month
//     } else {
//         content = ''
//     }
//     let span = document.getElementById('time-delivery-oreder');
//     span.textContent = content;
// }