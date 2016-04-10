export default {
  id: 'youtube.com',
  commands: [
    {
      name: 'play-or-pause',
      exec: () => document.querySelector('.ytp-play-button').click()
    }
  ]
};
