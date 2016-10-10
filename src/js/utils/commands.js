import vkProvider from '../plugins/vk';
import youtubeProvider from '../plugins/youtube';
import googleMusicProvider from '../plugins/google-music';
import chromeProvider from '../plugins/chrome';

const providers = [
  googleMusicProvider,
  vkProvider,
  youtubeProvider,
  chromeProvider
];

const commands = providers.reduce((total, provider) => {
  const providerCommands = provider.commands.map(command => {
    command.id = provider.id + '/' + command.name;
    command.provider = provider.id;

    if (typeof command.isContentScript === 'undefined') {
      command.isContentScript = provider.isContentScript;
    }

    return command;
  });

  return total.concat(providerCommands);
}, []);

const Commands = {
  all: commands,
  get: function(id) {
    for (let i = 0 ; i < commands.length ; i++) {
      if (commands[i].id === id) {
        return commands[i];
      }
    }
  }
};

export function executeCommand(data, callback) {
  const command = Commands.get(data.id);
  const domain = command.provider;

  if (command.isContentScript) {
    chrome.tabs.query({}, function(tabs) {
      let tab;

      if (domain === 'chrome') {
        tab = tabs.find(tab => tab.active);
      } else {
        tab = tabs.find(tab => {
          const url = new URL(tab.url).hostname;
          return url.indexOf(domain) > -1;
        });
      }

      chrome.tabs.sendRequest(tab.id, data, function(arg) {
        callback(arg);
      });
    });
  } else {
    command.exec(data, callback);
  }
}

export default Commands;
