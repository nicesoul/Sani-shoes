//This is a test,

//YAAAA! I found it )))))


const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')


// fs.readFile('items.json', "utf8", function (error, data) {
//     if (error) {
//         res.status(500).end()
//     } else {
//         // var itemsJson = []
//         itemsObj = JSON.parse(data)
//         itemsArr = itemsObj.shoes;
//         console.log(itemsArr)
//         console.log(Array.isArray(itemsArr));
//         console.log(req.body.items);


//         const a = itemsArr.find(item => item.name === 'Golden beige')
//         console.log(a, a.price, typeof (a.price));

//     }
// })
/*
app.post('/purchase', function (req, res) {
    fs.readFile('items.json', "utf8", function (error, data) {
        if (error) {
            res.status(500).end()
        } else {
            console.log(req.data);

            const itemsObj = JSON.parse(data)
            const itemsArr = itemsObj.shoes;
            let total = 0
            req.body.items.forEach(function (item) {
                const itemJson = itemsArr.find(function (i) {
                    return i.id == item.id
                })
                total = total + itemJson.price
            })
        }
    })
})
*/

// fs.readFile('items.json', "utf8", function (error, data) {
//     if (error) {
//         res.status(500).end()
//     } else {
//         const itemsJson = JSON.parse(data)
//         const itemsArray = itemsJson.music.concat(itemsJson.merch)
//         console.log(itemsArray);
//         var b = ['1','2','3']
//         let total = 0
//         b.forEach(function (item) {
//             const itemJson = itemsArray.find(function (i) {
//                 return i.id == item.id
//             })
//             console.log(itemJson);

//             total = total + itemJson.price
//             console.log(total);

//         })
//     }
// })

fs.readFile('items.json', "utf8", function (error, data) {
    var b = ['1', '2', '3']
    var total = 0
    const itemsJson = JSON.parse(data)
    const itemsArray = itemsJson.music.concat(itemsJson.merch)
    b.forEach(item => {if (itemsArray.includes(item)){c = item.id}
        console.log(c);

        total = total + a
        console.log(total);

    })
})