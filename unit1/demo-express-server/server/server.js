const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.send("Hello World!")
})

app.get('/route1', function (req, res) {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">hello world</h1>')
})
  

app.get('/products', function (req, res) {
    res.send("Here are the products.")
})

app.get('/products/:id', function (req, res) {
  res.send("Product ID: " + req.params.id)
})

app.get('/user/:id/listing/:listing_id', function (req, res) {
    res.send("listing ID: " + req.params.listing_id)
})
app.get('/*', function (req, res) {
    res.status(404).send("Not found")
})

app.post('/products', function (req, res) {
  res.send("this is a post handler!")
});

app.listen(3001, function() {
  console.log('Server started on port 3000');
});

