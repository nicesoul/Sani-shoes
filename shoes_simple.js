// I decided to leave top comment to report current status not to forget the plan and to recover working process easier.

// 17 June 2020 = this should be done till 20 June 2020

// function uploadcart() Доробити! 
// Налаштування шрифту - Consolas розмір 16, вага 200, інтервал 16, відчувається трохи сплюснутим. Хоча якщо у два віконця працювати, то добре так видно. Все таки зробив інтервал 19, бо давить :)

// so not to make another html I will assume that we got only 1 copy of each item (I think it's true anyway)
// But I have to change HTML *(((((SAD))))) => 16:52 Ok, so it took a day to implement.  (((MAD)))
// I already did manage to add only one copy of item into the local storage and #rightnow
// 
// also I need to implement a price and total as well.
// 
var itemNames = ["Golden beige","Shiny golden","Pixy beige","Browny orange","Pinky brown","Dark brown","Cloudy grey","Browny aquamarine","Blacky brown","Heart"]
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
    // cartprise = event.target. 
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
// ======================  END OF FINE PART