let Promise = require('bluebird');
let io = require('socket.io-client');

import Commands from './commands.jsx';

let f = (data) => {
  var command = Commands.get(data.id);
  var domain = command.domain;

  chrome.tabs.getAllInWindow(null, function(tabs){
    for (var i = 0 ; i < tabs.length ; i++) {
      let tab = tabs[i];
      let url = new URL(tab.url).hostname;

      if (url.indexOf(domain) > -1) {
        chrome.tabs.sendRequest(tab.id, data, (data) => console.log(data));
      }
    }
  });
};

chrome.browserAction.onClicked.addListener((tab) => {
  return true;
});

chrome.runtime.onMessage.addListener(function(request, options, sendResponse) {
  if (request.type === 'proxy') {
    f(request.proxy.domain, request.proxy.action);
  } else if (request.type === 'backend-status') {
    sendResponse(socketStatus);
  }
});

let socketStatus = 'disconnected';

var socket = io('http://localhost:3002');
socket.on('connect', function() {
  console.log('connected');

  socketStatus = 'connected';
  socket.emit('init', {
    adapter: 'chrome',
    commands: Commands.all
  });
});

socket.on('action', (data, fn) => {
  console.log('action', data);
  f(data);
  console.log(fn);
  fn('chrome complete command');
});

socket.on('disconnect', () => {
  console.log('disconnected');
  socketStatus = 'disconnected';
});
