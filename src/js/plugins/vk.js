import $ from 'jquery';

const miniplayer = function(callbacks) {
  var player = $('#gp');
  var wrapper = $('#gp .wrap');
  var f = null;

  if (player.css('display') === 'none') {
    f = 'onHidden';
  } else if (wrapper.hasClass('active')) {
    f = 'onOpened';
  } else {
    f = 'onClosed';
  }

  console.log(f);
  callbacks[f]();
};

const withMiniplayer = function(fn) {
  var button = $('#gp_title');
  button.click();
  setTimeout(() => {
    fn();
  }, 2000);
};

module.exports = {
  id: 'vk.com',
  commands: [
    {
      name: 'play-or-pause',
      exec: () => {
        miniplayer({
          onHidden: () => $('#ac_play').click(),
          onOpened: () => $('#pd_play').click(),
          onClosed: () => $('#gp_play').click()
        });
      }
    },
    {
      name: 'prev',
      exec: () => {
        miniplayer({
          onHidden: () => $('.prev.ctrl').click(),
          onOpened: () => $('#pd_prev').click(),
          onClosed: () => withMiniplayer(() => $('#pd_prev').click())
        });
      }
    },
    {
      name: 'next',
      exec: () => {
        miniplayer({
          onHidden: () => $('.next.ctrl').click(),
          onOpened: () => $('#pd_next').click(),
          onClosed: () => withMiniplayer(() => $('#pd_next').click())
        });
      }
    }
  ]
};
