import Promise from 'bluebird';
import Client from './utils/client';

const client = new Client();

chrome.runtime.onMessage.addListener((request, options, sendResponse) => {
  if (request.type === 'proxy') {
    executeCommand(request.proxy.domain, request.proxy.action, data => console.log(data)); // Where do I use it?
  } else if (request.type === 'backend-status') {
    sendResponse(client.badge.socketStatus);
  }
});

chrome.browserAction.onClicked.addListener(tab => {
  return true;
});
