import { sync } from './plugin';

export default {
  id: 'youtube.com',
  isContentScript: true,
  commands: [
    {
      name: 'play-or-pause',
      exec: sync(() => document.querySelector('.ytp-play-button').click())
    }
  ]
};
