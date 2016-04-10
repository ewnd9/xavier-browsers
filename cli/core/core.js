'use strict';

const SocketIO = require('socket.io');

module.exports = function(cb) {
  const port = '3002';
  const io = SocketIO(port);

  io.on('connection', function (socket) {
    socket.on('init', function (data) {
      console.log('plugin connected:', data);
      
      cb(function(id) {
        socket.emit('action', { id }, function(response) {
          console.log(`${id} response: ${response}`);
        });
      }, data.commands);
    });

    socket.on('disconnect', function () {
      console.log('plugin disconnected');
    });
  });
};
