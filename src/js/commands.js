import vkProvider from './plugins/vk';
import youtubeProvider from './plugins/youtube';
import googleMusicProvider from './plugins/google-music';

const providers = [
  googleMusicProvider,
  vkProvider,
  youtubeProvider
];

const commands = providers.reduce((total, provider) => {
  const providerCommands = provider.commands.map(command => {
    command.id = provider.id + '/' + command.name;
    command.provider = provider.id;
    
    return command;
  });

  return total.concat(providerCommands);
}, []);

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
