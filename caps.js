'use strict';

const faker = require('faker')
const events = require('./lib/event.js');
const { address } = require('faker');

require('./lib/driver.js')
require('./lib/vendor.js')

let time = new Date();

function newOrder() {
  let randomId = faker.finance.iban();
  let randomProduct = faker.commerce.productName();
  let quantityOfThing = Math.ceil(Math.random() * Math.floor(10));

  events.emit('order', {id: randomId, product: randomProduct, quantity: quantityOfThing})


  setTimeout(function(){
    newOrder();
  },20000);
}

events.on('order-confirmed', (payload) => {
  setTimeout(function(){
  console.log({ order: payload.id, product: `${payload.quantity} ${payload.product}'s`, status: `Ready to be picked up.`, time})
    events.emit('ready-for-pickup', (payload))
  }, 3000);
})

events.on('in-transit', (payload) => {
  console.log({ order: payload.id, product: `${payload.quantity} ${payload.product}`, status: `${payload.quantity} ${payload.product}'s have been picked up from the vendor and are in route to their destination.`, time})
})

events.on('arrived', (payload) => {
  console.log({ order: payload.id, product: `${payload.quantity} ${payload.product}`, status: `${payload.quantity} ${payload.product}'s have arrived at their destination.`, time})
})

newOrder();