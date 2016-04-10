import $ from 'jquery';

export default {
  id: 'play.google.com',
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
