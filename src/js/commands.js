import $ from 'jquery';

const vkProvider = (function() {

  let miniplayer = function(callbacks) {
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

  let withMiniplayer = function(fn) {
    var button = $('#gp_title');
    button.click();
    setTimeout(() => {
      fn();
    }, 2000);
  };

  return {
    id: 'vk.com',
    name: 'vk.com',
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
})();

const youtubeProvider = {
  id: 'youtube.com',
  name: 'youtube.com',
  commands: [
    {
      name: 'play',
      exec: () => { $('.ytp-button-play').click(); }
    },
    {
      name: 'pause',
      exec: () => { $('.ytp-button-pause').click(); }
    }
  ]
};

const googleMusicProvider = {
  id: 'play.google.com',
  name: 'play.google.com',
  commands: [
    {
      name: 'prev',
      exec: () => { $('[data-id="rewind"]').click(); }
    },
    {
      name: 'next',
      exec: () => { $('[data-id="forward"]').click(); }
    }
  ]
};

const commands = [];

const f = provider => {
  for (let i = 0 ; i < provider.commands.length ; i++) {
    provider.commands[i]['id'] = provider.id + '/' + provider.commands[i].name;
    provider.commands[i]['group'] = provider.name;
    provider.commands[i]['domain'] = provider.id;

    commands.push(provider.commands[i]);
  }
};

f(vkProvider);
f(youtubeProvider);
f(googleMusicProvider);

export default {
  all: commands,
  get: function(id) {
    for (let i = 0 ; i < commands.length ; i++) {
      if (commands[i].id === id) {
        return commands[i];
      }
    }
  }
};
