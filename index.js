// also I need to implement a price and total as well.
// 
var itemNames = ["Golden_beige","Shiny_golden","Pixy_beige","Browny_orange","Pinky_brown","Dark_brown","Cloudy_grey","Browny_aquamarine","Blacky_brown","Heart"]
const main = document.querySelector("#main");
const cart = document.querySelector('#rightnav');
// var cartItems = new Set; // let's try work with Set? = NO )))
var cartItems = []; // cartItems is a global array for localStorage

uploadcart();
EventListeners();
itemNames.forEach(shoe => compareRight(shoe));
EventListeners(); // because of my weird style this function should be called twice, sorry )
 
// I Want to refactor it, giving only one event-listener to the html body
function EventListeners() { // as we have many buttons, we should add EventListener to all of them
    const addToCartBtnNode = document.querySelectorAll(".addtocart");
    const addToCartBtn = [...addToCartBtnNode]
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
    cartItemName = cartItemName.replace(/\s/g, "_")
    if (!cartItems.includes(cartItemName)){
    makeCartItem(cartItemName);
    cartItems.push(cartItemName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    EventListeners();} // add EventListener to new button     
}
function uploadcart() {
    if  (localStorage.getItem('cartItems') != null || localStorage.getItem('cartItems') != undefined)
    {cartItems = JSON.parse(localStorage.getItem('cartItems'))}
}
function compareRight(arg){
    if (cartItems.includes(arg))
    {let found = document.getElementById(arg).click()
    makeCartItem(arg)}
}
function removeFromCart() {
    event.target.parentElement.remove();
    id = event.target.parentElement.id;
    for (var i = cartItems.length -1; i >=0 ; i--) {
        if (cartItems[i] === id) {cartItems.splice(i, 1);}}
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
function createElementFunc(tagName) {
    return document.createElement(tagName);
}
function makeCartItem(cartItemName) { // i made it with more simple structure    
    const cartItemDiv = createElementFunc('div');
    cartItemDiv.className = "shoes_small";
    cartItemDiv.id = cartItemName;
    // cartItemDiv.innerText = cartItemName;
    const img = createElementFunc('img');
    img.src = imgSrc;
    const button = createElementFunc('button');
    button.className = 'removefromcart';
    button.innerHTML = '&#10799';
    cartItemDiv.appendChild(img);
    cartItemDiv.appendChild(button);
    cart.appendChild(cartItemDiv);
}