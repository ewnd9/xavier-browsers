let $ = require('jquery');
import Commands from './commands.jsx';

$(function() {
  chrome.extension.onRequest.addListener((request, options, sendResponse) => {
    var command = Commands.get(request.id);
    var f = command.exec;

    if (typeof f === 'function') {
      console.log(f);
      f.apply(this);
      sendResponse('success');
    } else {
      console.log('not a function', commands, request);
      sendResponse('error');
    }
  });
});
