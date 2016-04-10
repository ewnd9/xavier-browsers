import commands from './commands';

chrome.extension.onRequest.addListener((request, options, sendResponse) => {
  const command = commands.get(request.id);

  if (command.exec) {
    exec.apply(this);
    sendResponse('success');
  } else {
    sendResponse(`error: can't find ${request.id}`);
  }
});
