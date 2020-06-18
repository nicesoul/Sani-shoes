// const buttonDiv = document.querySelectorAll('.numpad');
// const result = document.querySelector('.result');
// const calcIt = document.querySelector('.calcit');

// calcIt.addEventListener('click', calcItFunc);
// buttonDiv.forEach((aaa) => {
//     aaa.addEventListener('click', clickFunc);
// });

// function clickFunc() {
//     buttonValue = event.target.value;
//     console.log(buttonValue);
//     result.value += buttonValue;
// };

// function calcItFunc(arg) {
//     arg = eval(result.value);
//     result.value = arg;
// }

// CLASS based programming way to do this (Atilla's solution)

// const result = document.querySelector('.result');
// const calcIt = document.querySelector('.calcit');
// const inputs = document.querySelectorAll('.numpad');

// class Calculator {
//     getVal(val) {
//         result.value += val
//     }
//     calcIt() {
//         let a = result.value // eval("1+1") => 2  2+4
//         let b = eval(a); // 2+4
//         result.value = b;
//         console.log(b)
//     }
// }
// let calc = new Calculator();
// // event listeners
// calcIt.addEventListener('click', function (e) {
//     calc.calcIt();
// })
// inputs.forEach((input) => {
//     input.addEventListener('click', function (e) {
//         calc.getVal(input.value)
//         console.log(input)
//         e.preventDefault();
//     })
// })

// let a = [1,'cart1', 3, 4, 5];
// let b = 'cart1';
// let c = 'cart';
// if (a.includes(b)) {
//     console.log(b, 'yes')
// } else if (a.includes(c)) {
//     console.log(c, 'yes')
// } else {
//     console.log('no')
// };

var fff = [1,2,3]
var ddd = [3,4,5]
var bbb = 5
var aaa = '4'
compare(fff,ddd)
function compare(arr1,arr2) {
    // let first = JSON.stringify(arr1)
    // let second = JSON.stringify(arr2)
   let result = JSON.stringify(arr1.filter(value => arr2.includes(value)))
   console.log(result, typeof(result),bbb, typeof(bbb), aaa, typeof(aaa))
}

