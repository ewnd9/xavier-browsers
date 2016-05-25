export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export default Badge;

function Badge() {
  this.socketStatus = DISCONNECTED;
}

Badge.prototype.setSocketStatus = function(status) {
  if (status === CONNECTED) {
    console.log('connected');
    this.socketStatus = CONNECTED;

    chrome.browserAction.setBadgeText({ text: '' });
  } else {
    console.log('disconnected');
    this.socketStatus = DISCONNECTED;

    chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
    chrome.browserAction.setBadgeText({ text: '!' });
  }
};
