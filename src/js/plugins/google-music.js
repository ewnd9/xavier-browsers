import { sync } from './plugin';

export default {
  id: 'play.google.com',
  isContentScript: true,
  commands: [
    {
      name: 'play-or-pause',
      exec: sync(() => document.querySelector('#player-bar-play-pause').click())
    },
    {
      name: 'prev',
      exec: sync(() => document.querySelector('#player-bar-rewind').click())
    },
    {
      name: 'next',
      exec: sync(() => document.querySelector('#player-bar-forward').click())
    }
  ]
};
