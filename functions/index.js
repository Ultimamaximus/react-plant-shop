const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret);
const logger = require("firebase-functions/logger");

exports.createStripePaymentIntent = functions.https.onCall(async (data, context) => {
  // Log the function call for debugging purposes
  logger.info("Creating new Stripe payment intent", {structuredData: true});

  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: 'usd'
  });

  return {
    clientSecret: paymentIntent.client_secret
  };
});
