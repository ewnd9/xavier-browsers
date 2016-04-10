export default {
  id: 'play.google.com',
  commands: [
    {
      name: 'play-or-pause',
      exec: () => document.querySelector('#player-bar-play-pause').click()
    },
    {
      name: 'prev',
      exec: () => document.querySelector('#player-bar-rewind').click()
    },
    {
      name: 'next',
      exec: () => document.querySelector('#player-bar-forward').click()
    }
  ]
};
