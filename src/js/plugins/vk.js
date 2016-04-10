export default {
  id: 'vk.com',
  commands: [
    {
      name: 'play-or-pause',
      exec: () => {
        const playButton = document.querySelector('#ac_play');

        if (playButton) {
          click(playButton);
          return;
        }

        const miniPlayer = document.querySelector('#gp_play');

        if (miniPlayer) {
          click(miniPlayer);
        }
      }
    },
    {
      name: 'prev',
      exec: () => openMiniPlayer('#ac_prev', '#pd_prev')
    },
    {
      name: 'next',
      exec: () => openMiniPlayer('#ac_next', '#pd_next')
    }
  ]
};

function click(el) {
  if (el.onclick) {
     el.onclick();
  } else if (el.click) {
     el.click();
  }
};

function openMiniPlayer(id1, id2) {
  const button = document.querySelector(id1);

  if (button) {
    click(button);
    return;
  }

  const miniPlayer = document.querySelector('#gp_info');
  click(miniPlayer);

  setTimeout(() => {
    click(document.querySelector(id2));
  }, 1000);
};
