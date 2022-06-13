const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51L82r9HuFTJR44r2Eo7mEWknVKQ6EJvIkuQilUW8wi5dEv1zNMwT0kV1aRykaws2lK8vXA28OZ6yhR17eyccFckL00m8NIXFnn");


       // cd to functions not only amazon-clone





// API

// -App config
const app = express();

// -Middlewares
app.use(cors({ origin:true }));
app.use(express.json());


// -Api routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
       const total = request.query.total;

       console.log('Payment Request Recieved BOOM!! for this amnount >>>', total);

       const paymentIntent = await stripe.paymentIntents.create({
              amount: total,
              currency: "usd",
       });
       //ok -created
       response.status(201).send({
              clientSecret: paymentIntent.client_secret,
       });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-132bd/us-central1/api