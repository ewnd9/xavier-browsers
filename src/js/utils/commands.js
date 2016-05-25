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
    command.isContentScript = provider.isContentScript;

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
      for (let i = 0 ; i < tabs.length ; i++) {
        const tab = tabs[i];
        const url = new URL(tab.url).hostname;

        if (url.indexOf(domain) > -1) {
          chrome.tabs.sendRequest(tab.id, data, function(arg) {
            callback(arg);
          });
        }
      }
    });
  } else {
    command.exec(data, callback);
  }
};

export default Commands;
