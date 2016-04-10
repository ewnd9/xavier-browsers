let socketStatus;

export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export const setSocketStatus = status => {
  if (status === CONNECTED) {
    console.log('connected');
    socketStatus = CONNECTED;

    chrome.browserAction.setBadgeText({ text: '' });
  } else {
    console.log('disconnected');
    socketStatus = DISCONNECTED;

    chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
    chrome.browserAction.setBadgeText({ text: '!' });
  }
};
