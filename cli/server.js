#!/usr/bin/env node

'use strict';

const net = require('net');
const fs = require('fs');

const SOCKET = '/tmp/xavier.sock';

fs.stat(SOCKET, err => {
  if (!err) {
    fs.unlinkSync(SOCKET);
  }

  const ALL = { id: 'all' };
  const standard = [ALL];

  let commands = standard;
  let send = function() {};

  require('./core/core')(process.argv[2] || '3002', function(_send, _commands) {
    commands = standard.concat(_commands);
    send = _send;
  });

  const unixServer = net.createServer(connection => {
    connection.on('data', data => {
      const name = data.toString();

      if (name === ALL.id) {
        connection.write(commands.map(_ => _.id).join('\n'));
      } else {
        const command = commands.find(command => command.id === name);

        if (!command) {
          connection.write('not found');
        } else {
          send(command.id);
          connection.write('ok');
        }
      }
    });
  });

  unixServer.listen(SOCKET);
});
