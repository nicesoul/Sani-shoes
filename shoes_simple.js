// myGod. I just started at 20:10

const main = document.querySelector("#main");
const cart = document.querySelector('#rightnav');
EventListeners();
// readyFreddy();

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
}

function addToCartFunc() {
    imgSrc = event.target.parentElement.parentElement.childNodes[1].firstChild.src;
    var cartItem = event.target.parentElement.parentElement.childNodes[0].innerText;
    console.log(cartItem); 
    makeCartItem();
    // cartItemsToLocalStorage(cartItem);
    EventListeners(); // add EventListener to new button
}

function removeFromCart() {
    cartItemToRemove = event.target.parentElement.remove();
    // EventListeners(); // update EventListener??
}

function createElementFunc(tagName) {
    return document.createElement(tagName);
}

/*<div class="shoes_small">
        <p> shoe1</p>
        <div><img src="Baby leather shoes_00.jpg" alt="BABY LEATHER SHOES"></div>
        <p> pic1 <span><button class="removefromcart">&#10799;</button></span></p>
    </div>*/


function makeCartItem() { // i made it with more simple structure
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
    // event.preventDefault()
}
function cartItemsToLocalStorage(cartItem){
    let cartItems;
    if(localStorage.getItem('cartItems')==null){
        cartItems = [];
    }else {
        cartItems = JSON.parse(localStorage.getItem('cartItem'));
    }
    cartItems += cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// function getTodosFromStorage() {
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     } return todos
// }

// function addTodoToDoToStorage(arg) {
//     let todos = getTodosFromStorage(); //todos array
//     todos.push(arg);
//     localStorage.setItem('todos', JSON.stringify(todos));
// }


// function loadCart(){ //load cart items from LocalStorage
//     let cart = 
// }

// Pavithra method 
// button.addEventListener("click", function() {
//     users.forEach(user => {
//       const { ...rest } = user;
  
//       console.log(JSON.stringify(rest));
//     });
//   });