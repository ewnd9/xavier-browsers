import io from 'socket.io-client';
import Badge, { CONNECTED, DISCONNECTED } from './badge';
import Commands, { executeCommand } from './commands';

function Client() {
  this.socket = io('http://localhost:3002');
  this.badge = new Badge();

  this.socket.on('connect', () => {
    this.badge.setSocketStatus(CONNECTED);

    this.socket.emit('init', {
      adapter: 'chrome',
      commands: Commands.all
    });
  });

  this.socket.on('action', (data, fn) => this.onCommand(data, fn));
  this.socket.on('disconnect', () => this.badge.setSocketStatus(DISCONNECTED));
  
  this.onCommand = executeCommand;
};

export default Client;
