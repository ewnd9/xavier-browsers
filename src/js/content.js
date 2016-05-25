import commands from './utils/commands';

chrome.extension.onRequest.addListener((request, options, sendResponse) => {
  const command = commands.get(request.id);
  if (command.exec) {
    command.exec.apply(this, [request.id, sendResponse]);
  } else {
    sendResponse(`error: can't find ${request.id}`);
  }
});
