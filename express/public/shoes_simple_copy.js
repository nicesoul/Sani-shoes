// I decided to leave top comment to report current status not to forget the plan and to recover working process easier.

// TOP comment ))) => UPDATE API to a Newer version!!!
// This is a legacy version of Stripe which works without a bank requests for card authentication (kind of as on US sites like Amazon)

// Also I should made a second page with items details like shoe size and description.
// This current page could become like a cart page so I can create the Main one with more info about the shop.
// 

//this items would come from an ITEMS.JSON later. Just want to send it sooner, beleive me )))
var itemNames = ["Golden_beige","Shiny_golden","Pixy_beige","Browny_orange","Pinky_brown","Dark_brown","Cloudy_grey","Browny_aquamarine","Blacky_brown","Heart"]
const main = document.querySelector("#main");
const cart = document.querySelector('#rightnav');
const cartprice = document.querySelector('#cartprice');
const clearCart = document.querySelector('#clearCart').addEventListener('click', clearCartFunc);
const buyCart = document.querySelector('#buyCart').addEventListener('click', buyCartFunc);
// var cartItems = new Set; // let's try work with Set? = NO )))
var cartItems = []; // cartItems is a global array for localStorage
var cartItemName, imgSrc, price, id, priceString, target, found, itemId, items;

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
    imgSrc = event.target.parentElement.parentElement.childNodes[3].firstChild.src;
    cartItemName = event.target.parentElement.parentElement.childNodes[1].childNodes[0].nodeValue;
    cartItemName = cartItemName.replace(/\s/g, "_");
    priceString = event.target.parentElement.childNodes[3].innerText
    price = parseFloat(priceString.replace(/\D/g,''))
    target = event.target.className;
    itemId = event.target.parentElement.parentElement.dataset.itemId;
    
    if (!cartItems.includes(cartItemName)){
    makeCartItem(cartItemName,price,itemId);
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
    if (cartItems.includes(arg)){ 
        found = document.getElementById(arg);
        found.click()
    itemId = found.parentElement.parentElement.dataset.itemId; 
    priceString = found.parentElement.childNodes[3].innerText;
    price = parseFloat(priceString.replace(/\D/g,''));
    makeCartItem(arg,price,itemId); target = found.className;
    updatePrice(target,price)
}
}
function removeFromCart() {    
    target = event.target.parentElement.childNodes[1].className;
    price = parseFloat(event.target.parentElement.childNodes[2].className)
    updatePrice(target,price);
    id = event.target.parentElement.id;
    event.target.parentElement.remove();
    
    for (var i = cartItems.length -1; i >=0 ; i--) {
        if (cartItems[i] === id) {cartItems.splice(i, 1);}}
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
function createElementFunc(tagName) {
    return document.createElement(tagName);
}
function makeCartItem(cartItemName,price,itemId) { // i made it with more simple structure    
    const cartItemDiv = createElementFunc('div');
    cartItemDiv.className = "shoes_small";
    cartItemDiv.id = cartItemName;
    cartItemDiv.dataset.itemId = itemId;
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
function buyCartFunc (){
    if (cartprice.innerText != '0'){
        let currentprice = parseFloat(cartprice.innerText)
        sstripeHandler.open({amount: currentprice*100})
    }
}
function clearCartFunc(){ if (cartprice.innerText != '0'){
    const cart_DOM_Items = document.querySelectorAll('.shoes_small')
    cart_DOM_Items.forEach(node => node.remove())
    cartItems = []
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    cartprice.innerText = 0;
}}

var sstripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'auto',
    token : function (token) {
        const cart_DOM_Items = document.querySelectorAll('.shoes_small');
        
        items = []
        cart_DOM_Items.forEach(node => 
            items.push({id:node.dataset.itemId}));
        console.log('this is items =>', items)
    fetch('/purchase',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            stripeTokenId: token.id,
            items: items})            
            
    }).then(res => res.json())
      .then(data => {alert(data.message)
      clearCartFunc()})
      .catch(err => console.log(err))
}})

// ======================  END OF FINE PART
