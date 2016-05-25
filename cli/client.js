#!/usr/bin/env node

'use strict';

const net = require('net');
const SOCKET = '/tmp/xavier.sock';

const client = net.createConnection(SOCKET);
const log = console.log.bind(console);

client.on('error', err => {
  log(`failed to connect to server: ${err}`);
});

client.on('connect', () => {
  client.write(JSON.stringify({ id: process.argv[2], args: process.argv.slice(3) }));
});

client.on('data', data => {
  log(data.toString());
  client.end();
});
