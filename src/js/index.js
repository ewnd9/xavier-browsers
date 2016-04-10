import $ from 'jquery';

$(() => {
  const f = (domain, action) => {
    const message = {
      type: 'proxy',
      proxy: {
        domain: domain,
        action: action
      }
    };

    chrome.runtime.sendMessage(message, data => console.log(data));
  };

  $('#vk-prev').click(() => f('vk.com', 'prev'));
  $('#vk-next').click(() => f('vk.com', 'next'));

  const onStatus = status => $('#backend-status').text(status);

  chrome.runtime.sendMessage({ type: 'backend-status' }, onStatus);
});
