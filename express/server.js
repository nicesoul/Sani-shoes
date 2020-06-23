if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
// console.log(stripeSecretKey, stripePublicKey)
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
const stripe = require('stripe')(stripeSecretKey)

app.set('view engine', 'ejs')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
// this is my func required to see public, the simple method doesn't work
// app.get('/', (req, res) =>{res.sendFile(path.join(__dirname,'/public/shoes_simple_copy.html'))  })

//this could be optional
app.get('/shoes', function(req,res){
    fs.readFile('items.json', "utf8", function(error, data){
        if (error){
            res.status(500).end()
        } else {
            res.render('shoes.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data)
            })
        }
    })
})

app.post('/purchase', function (req, res) {
    fs.readFile('items.json', "utf8", function (error, data) {
        if (error) {
            res.status(500).end()
        } else {
            const itemsObj = JSON.parse(data)
            const itemsArr = itemsObj.shoes;
            let total = 0
            console.log('this is req.body.items =>',req.body.items);
            
            req.body.items.forEach(function (item) {
                const itemJson = itemsArr.find(function(i){
                    return i.id == item.id
                })
                console.log('line 46',itemJson)
                total = total + itemJson.price                
            })
            stripe.charges.create({
                amount: total,
                source: req.body.stripeTokenId,
                currency: 'usd'
            }).then(function () {
                console.log('charge successful');
                res.json({message: 'Successfully purchased items'})
            }).catch(function (){
                console.log('Charge Failed')
                res.status(500).end()
            })
        }
    })
})


app.listen(3000)
