#!/usr/bin/env node

'use strict';

const net = require('net');
const SOCKET = '/tmp/xavier.sock';

const client = net.createConnection(SOCKET);

client.on('error', err => {
  console.log(`failed to connect to server: ${err}`);
});

client.on('connect', () => {
  client.write(process.argv[2]);
});

client.on('data', data => {
  console.log(data.toString());
  client.end();
});
