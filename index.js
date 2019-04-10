//jshint esversion: 6

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req,res) => {
    
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;
    

    var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat;
    
    var options = {

        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {

            from: crypto,
            to: fiat,
            amount: amount

        }

    };

    request(options, (error, response, body) => {

        var data = JSON.parse(body);
        var price = data.price;
        var currentDate = data.time;
        console.log(options);

        // res.send("<h1>The Bitcoin current price is: " + price + " USD</h1>");

        res.write("<p>The current date is " + currentDate + "</p>");
        // res.write("<h1>The current price of " + crypto + " is " + price + "</h1>");
        res.write("<h1>The price of " + amount + " " +  crypto + " is " + price + " " + fiat + "</h1>");

        console.log(price);


    });
});



app.listen(3000, () => console.log("Server is running on port 3000"));