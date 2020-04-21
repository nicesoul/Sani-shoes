// I decided to leave top comment to report current status not to forget the plan and to recover working process easier.

// 1   For now I am trying to make a shopping basket = uploadCart().
//     I already did manage to add only one copy of item into the local storage
// 2   Now I have to add only one copy to #rightnav and increase counter.
// 3   also I need to implement a price and count it as well.

//line 12+, 27+, lines 80+

const main = document.querySelector("#main");
const cart = document.querySelector('#rightnav');
var counter = 0;
// cartItems is a global array for localStorage
EventListeners();
uploadcart();
// as we have many buttons, we should add EventListener to all of them

function EventListeners() {
    const addToCartBtn = document.querySelectorAll(".addtocart");
    const removeFromCartBtn = document.querySelectorAll(".removefromcart");
    addToCartBtn.forEach((btn) => {
        btn.addEventListener("click", addToCartFunc);
    });
    removeFromCartBtn.forEach((btn) => {
        btn.addEventListener("click", removeFromCart);
    });
    cartItem = document.querySelectorAll('.shoes_small');
    cartItemCount = cartItem.length;
}

function addToCartFunc() {
    imgSrc = event.target.parentElement.parentElement.childNodes[1].firstChild.src;
    cartItemName = event.target.parentElement.parentElement.childNodes[0].innerText;

    if (localStorage.getItem('cartItems') == null) {
        cartItems = [];
    } else {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
    };

    if (cartItems.includes(cartItemName)) {
        console.log('yes'); let a = counter+1;
        console.log('a=',a);
        makeCartItem(a);
    } else {
        console.log('else');
        makeCartItem();
    }

    cartItems.push(cartItemName);
    cartItems = [...new Set(cartItems)];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // console.log(42, cartItems, cartItemName);
    EventListeners(); // add EventListener to new button

}
// function increaseItems(){
// }

function uploadcart() {
    console.log('i want to upload the cart');
    // for (var i = 0; i < BBB.length; i++) {
    //     if (BBB[i] === id) {BBB.splice(i, 1);}
};

function removeFromCart() {
    event.target.parentElement.remove();
    id = event.target.parentElement.id;
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i] === id) {
            cartItems.splice(i, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }
}

function createElementFunc(tagName) {
    return document.createElement(tagName);
}

function makeCartItem(arg) { // i made it with more simple structure
    console.log('func is called');
    const cartItemDiv = createElementFunc('div');
    cartItemDiv.className = "shoes_small";
    cartItemDiv.id = cartItemName;
    const img = createElementFunc('img');
    img.src = imgSrc;

    const itemCounterSmall = createElementFunc('span');
    itemCounterSmall.innerText = arg;
    cartItemDiv.appendChild(itemCounterSmall);

    const button = createElementFunc('button');
    button.className = 'removefromcart';
    button.innerHTML = '&#10799';
    cartItemDiv.appendChild(img);
    cartItemDiv.appendChild(button);

    cart.appendChild(cartItemDiv);
}
// ======================  END OF FINE PART