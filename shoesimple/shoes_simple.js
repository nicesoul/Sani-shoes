// I decided to leave top comment to report current status not to forget the plan and to recover working process easier.
// TOP comment )))

// this itemNames should be collected from HTML DOM, not hardcoded, right?
var itemNames = ["Golden_beige","Shiny_golden","Pixy_beige","Browny_orange","Pinky_brown","Dark_brown","Cloudy_grey","Browny_aquamarine","Blacky_brown","Heart"]
const main = document.querySelector("#main");
const cart = document.querySelector('#rightnav');
const cartprice = document.querySelector('#cartprice');
const clearCart = document.querySelector('#clearCart').addEventListener('click', clearCartFunc);
const buyCart = document.querySelector('#buyCart').addEventListener('click', buyCartFunc);
// var cartItems = new Set; // let's try work with Set? = NO )))
var cartItems = []; // cartItems is a global array for localStorage
var cartItemName, imgSrc, price, id, priceString, target;

uploadcart(); // get itemlist from local storage
EventListeners(); // add event listeners to buttons ADD to cart and REMOVE from cart
itemNames.forEach(shoe => compareRight(shoe)); // check if any items from local storage match shoe's names (hardcoded for now) and add to cart using click() on ADD btn
EventListeners(); // because of my weird style this function should be called twice, sorry ) // add event listener to newly created items REMOVE buttons in a cart

// I Want to refactor it, giving only one event-listener to the html body
function EventListeners() { // as we have many buttons, we should add EventListener to all of them
    const addToCartBtnNode = document.querySelectorAll(".addtocart");
    const addToCartBtn = [...addToCartBtnNode] // I created an array but don't use it yet differently yet.
    const removeFromCartBtnNode = document.querySelectorAll(".removefromcart");
    const removeFromCartBtn = [...removeFromCartBtnNode]
    addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", addToCartFunc);
    });
    removeFromCartBtn.forEach((btn) => {
        btn.addEventListener("click", removeFromCart);
    })
}
function addToCartFunc() {
    imgSrc = event.target.parentElement.parentElement.childNodes[2].firstChild.src;
    cartItemName = event.target.parentElement.parentElement.childNodes[0].childNodes[0].nodeValue;
    cartItemName = cartItemName.replace(/\s/g, "_");
    console.log(event.target.parentElement.childNodes[2].innerText);
    priceString = event.target.parentElement.childNodes[2].innerText
    price = parseFloat(priceString.replace(/\D/g,''))
    // typeof(price) === NaN ? price : price = 0; // did you know that ternany operator can only have one "return type"?
    target = event.target.className;
    
    if (!cartItems.includes(cartItemName)){
    makeCartItem(cartItemName,price);
    updatePrice(target,price);
    cartItems.push(cartItemName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    EventListeners();} // add EventListener to a new button     
}
function uploadcart() {
    if  (localStorage.getItem('cartItems') != null || localStorage.getItem('cartItems') != undefined)
    {cartItems = JSON.parse(localStorage.getItem('cartItems'))}
}
function compareRight(arg){
    if (cartItems.includes(arg))
    {let found = document.getElementById(arg);found.click()
    priceString = found.parentElement.childNodes[2].innerText
    price = parseFloat(priceString.replace(/\D/g,''))
    makeCartItem(arg,price); target = found.className;
    updatePrice(target,price)
}
}
function removeFromCart() {    
    target = event.target.parentElement.childNodes[1].className;
    price = parseFloat(event.target.parentElement.childNodes[2].className)
    updatePrice(target,price);
    event.target.parentElement.remove();
    id = event.target.parentElement.id;
    for (var i = cartItems.length -1; i >=0 ; i--) {
        if (cartItems[i] === id) {cartItems.splice(i, 1);}}
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
function createElementFunc(tagName) {
    return document.createElement(tagName);
}
function makeCartItem(cartItemName,price) { // i made it with more simple structure    
    const cartItemDiv = createElementFunc('div');
    cartItemDiv.className = "shoes_small";
    cartItemDiv.id = cartItemName;
    const spanprice = createElementFunc('span')
    spanprice.className = Number(price);
    const img = createElementFunc('img');
    img.src = imgSrc;
    const button = createElementFunc('button');
    button.className = 'removefromcart';
    button.innerHTML = '&#10799';
    cartItemDiv.appendChild(img);
    cartItemDiv.appendChild(button);
    cartItemDiv.appendChild(spanprice);
    cart.appendChild(cartItemDiv);   
}
function updatePrice(target,price){
    let currentprice = parseFloat(cartprice.innerText);
    if (target == 'addtocart'){
        currentprice += price;
        cartprice.innerText = currentprice;
    }else if (target == 'removefromcart'){
        currentprice -= price;
        cartprice.innerText = currentprice;
    }
}
function buyCartFunc (){if (cartprice.innerText != '0'){
    console.log(cartprice.innerText)
    alert('thank you for your purchase')
    clearCartFunc()} 
    // else (alert('the cart is empty. add some items first, please'))
}
function clearCartFunc(){ if (cartprice.innerText != '0'){
    const cart_DOM_Items = document.querySelectorAll('.shoes_small')
    cart_DOM_Items.forEach(node => node.remove())
    cartItems = []
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    cartprice.innerText = 0;
}}

// ======================  END OF FINE PART