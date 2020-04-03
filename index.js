const main = document.querySelector("#main");
const cart = document.querySelector('#rightnav');

EventListeners();

function EventListeners() {
    const addToCartBtn = document.querySelectorAll(".addtocart");
    const removeFromCartBtn = document.querySelectorAll(".removefromcart");
    addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", addToCartFunc);
    });
    removeFromCartBtn.forEach((btn) => {
        btn.addEventListener("click", removeFromCart);
    });
}

function addToCartFunc() {
    imgSrc = event.target.parentElement.parentElement.childNodes[1].firstChild.src;
    var cartItem = event.target.parentElement.parentElement.childNodes[0].innerText;
    console.log(cartItem);
    makeCartItem();
    EventListeners(); // add EventListener to new button
}

function removeFromCart() {
    cartItemToRemove = event.target.parentElement.remove();
}

function createElementFunc(tagName) {
    return document.createElement(tagName);
}

function makeCartItem() {
    const cartItem = createElementFunc('div');
    cartItem.className = "shoes_small"
    const img = createElementFunc('img');
    img.src = imgSrc;
    const button = createElementFunc('button');
    button.className = 'removefromcart';
    button.innerHTML = '&#10799';
    cartItem.appendChild(img);
    cartItem.appendChild(button);
    cart.appendChild(cartItem);
}

function cartItemsToLocalStorage(cartItem) {
    let cartItems;
    if (localStorage.getItem('cartItems') == null) {
        cartItems = [];
    } else {
        cartItems = JSON.parse(localStorage.getItem('cartItem'));
    }
    cartItems += cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}