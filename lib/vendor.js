'use strict';

const events = require('./event.js');

events.on('order', (payload) => {

  setTimeout(function(){ 
    events.emit('order-confirmed', payload)
  }, 5000);
}); 