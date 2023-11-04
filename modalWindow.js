const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".edit-delivery-method-btn");
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// open modal function
const openModal = function (type) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    modal.style.top = scrollTop + "px";
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    let container = document.getElementById('content-modal');
    while (container.firstChild) {
        container.firstChild.remove();
    }
    /////////
    let parent = document.getElementById('content-modal');
    let headerBlock = document.getElementById('header-modal');
    let header = document.createElement('h3');
    var previousHeader = headerBlock.querySelector('h3');
    if (previousHeader) {
        previousHeader.remove();
    }

    if(type==='deliv'){
        header.textContent = 'Способ доставки';
        headerBlock.prepend(header)
        let contentBlock = document.createElement('section');
        contentBlock.className = 'choosing-delivery-method-container';
        contentBlock.innerHTML = `<div class="choosing-delivery-method" id="choosing-delivery-method">
                                <button id="to-pick-up-point-btn" onclick="changeDeliveryTypePP()">В пункт выдачи</button>
                                <button id="by-courier-btn" onclick="changeDeliveryTypeC()">Курьером</button>
                              </div>
                              <div class="choosing-address-container" id="choosing-address-container">
                                <div class="radio-group" id="address-modal">
                                </div>
                              </div>`
        let btn = document.createElement('div');
        btn.className = 'modal-btn';
        btn.innerHTML = `<button onclick="getAddressFromModal()">Выбрать</button>`;
        parent.append(contentBlock);
        parent.append(btn);
        if(typeDelivery===undefined) typeDelivery=typesDelivery[0];
        renderDelivery(selectedValueAddress);
    }else if(type==='payMet'){
        header.textContent = 'Способ оплаты';
        headerBlock.prepend(header)
        let contentBlock = document.createElement('section');
        contentBlock.className = 'choosing-delivery-method-container';
        parent.innerHTML = `<div class="choosing-bank-cards-container" id='choosing-bank-cards-container'>
                            </div>`
        let btn = document.createElement('div');
        btn.className = 'modal-btn';
        btn.innerHTML = `<button onclick="getSelectCard()">Выбрать</button>`;
        parent.append(contentBlock);
        parent.append(btn);
        renderCards();
        // if(typeDelivery===undefined) typeDelivery=typesDelivery[0];
        // renderDelivery(defaultAddress);
    }

};
document.addEventListener("DOMContentLoaded", function() {
    var checkboxes = document.querySelectorAll('input[name="bank_card"]');
    // Установка выбора чекбокса при открытии модального окна
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
});
function getSelectCard() {
    var selectedCheckbox = document.querySelector('input[name="bank_card"]:checked');
    if (selectedCheckbox) {
        selectedValueCardID = selectedCheckbox.id;
        for (var i = 0; i < personalData.cards.length; i++) {
            if (personalData.cards[i].id === selectedValueCardID) {
                selectedValueCard = personalData.cards[i];
                break;
            }
        }
        selectedCheckbox.checked = true;
    } else {
        console.log("Ни один чекбокс не выбран");
    }
    renderSelectCard();
    closeModal();
};
function getAddressFromModal() {
    var selectedCheckbox = document.querySelector('input[name="radio-address"]:checked');
    if (selectedCheckbox) {
        selectedValueAddressID = selectedCheckbox.id;
        console.log(selectedValueAddressID)
        console.log(typeDelivery)
        for (var i = 0; i < personalData.cards.length; i++) {
            if(typeDelivery===typesDelivery[1]){
                if (personalData.addresses[i].id === selectedValueAddressID) {
                    selectedValueAddress = personalData.addresses[i];
                    break;
                }
            }else{
                if (personalData.pickupPoints[i].id === selectedValueAddressID) {
                    selectedValueAddress = personalData.pickupPoints[i];
                    break;
                }
            }
        }
        selectedCheckbox.checked = true;
    }
    renderSelectAddressOrder(selectedValueAddress,typeDelivery)
    renderDeliveryPoint(selectedValueAddress, typeDelivery);
    closeModal();
};
// open modal event
