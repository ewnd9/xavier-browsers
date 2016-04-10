import $ from 'jquery';
import Commands from './commands';

$(() => {
  chrome.extension.onRequest.addListener((request, options, sendResponse) => {
    const { exec } = Commands.get(request.id);

    if (typeof exec === 'function') {
      exec.apply(this);
      sendResponse('success');
    } else {
      console.log('not a function', commands, request);
      sendResponse('error');
    }
  });
});
