import $ from 'jquery';

export default {
  id: 'youtube.com',
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
