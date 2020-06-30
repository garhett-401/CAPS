'use strict';

const events = require('./event.js');

events.on('ready-for-pickup', (payload) => {
  setTimeout(function(){
    events.emit('in-transit', (payload))
    setTimeout(function(){
      events.emit('arrived', (payload))
    }, 6000)
  }, 6000)
})