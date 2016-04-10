'use strict';

console.log('waiting for a connection');

require('./core/core')('3002', function(send, commands) {
  if (process.argv[2]) {
    const command = commands.find(command => command.id === process.argv[2]);

    if (!command) {
      console.log(`command with id "${process.argv[2]}" is not found`);
    } else {
      send(command.id);
    }
  } else {
    const menu = require('inquirer-menu');
    const choices = commands.reduce((total, command) => {
      total[command.id] = send.bind(null, command.id);
      return total;
    }, {});

    function createMenu() {
      return {
        message: 'Select a command',
        choices
      };
    };

    menu(createMenu)
      .catch(function(err) {
        console.log(err.stack);
      });
  }
});
