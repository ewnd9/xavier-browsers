import Promise from 'bluebird';
import io from 'socket.io-client';

import Commands from './commands';
import { setSocketStatus, CONNECTED, DISCONNECTED } from './badge';

const f = data => {
  const command = Commands.get(data.id);
  const domain = command.provider;

  chrome.tabs.query({}, function(tabs) {
    for (let i = 0 ; i < tabs.length ; i++) {
      const tab = tabs[i];
      const url = new URL(tab.url).hostname;

      if (url.indexOf(domain) > -1) {
        chrome.tabs.sendRequest(tab.id, data, data => console.log(data));
      }
    }
  });
};

chrome.browserAction.onClicked.addListener(tab => {
  return true;
});

chrome.runtime.onMessage.addListener((request, options, sendResponse) => {
  if (request.type === 'proxy') {
    f(request.proxy.domain, request.proxy.action);
  } else if (request.type === 'backend-status') {
    sendResponse(socketStatus);
  }
});

setSocketStatus(DISCONNECTED);

const socket = io('http://localhost:3002');
socket.on('connect', function() {
  setSocketStatus(CONNECTED);

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

socket.on('disconnect', () => setSocketStatus(DISCONNECTED));
