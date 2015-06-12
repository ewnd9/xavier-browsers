let $ = require('jquery');

$(function() {
  let f = (domain, action) => {
    let obj = { domain: domain, action: action };
    chrome.runtime.sendMessage({ type: 'proxy', proxy: obj }, (data) => console.log(data));
  };

  $('#vk-prev').click(() => f('vk.com', 'prev'));
  $('#vk-next').click(() => f('vk.com', 'next'));

  chrome.runtime.sendMessage({ type: 'backend-status' }, (status) => $('#backend-status').text(status));
});
