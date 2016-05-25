import { promise } from './plugin';

export default {
  id: 'chrome',
  isContentScript: false,
  commands: [
    {
      name: 'tabs',
      exec: promise(getTabs)
    },
    {
      name: 'active-tab',
      exec: promise(getActiveTab)
    },
    {
      name: 'activate-tab',
      exec: promise(activateTab)
    },
    {
      name: 'move-right',
      exec: promise(() => getNearTab(1))
    },
    {
      name: 'move-left',
      exec: promise(() => getNearTab(-1))
    }
  ]
};

function getTabs() {
  return new Promise(resolve => {
    chrome.tabs.query({}, resolve);
  });
}

function getActiveTab(args) {
  return getTabs()
    .then(tabs => {
      return tabs[getActiveTabIndex(tabs)];
    })
}

function getActiveTabIndex(tabs) {
  let activeIndex = -1;

  for (let i = 0 ; i < tabs.length ; i++) {
    if (tabs[i].active) {
      activeIndex = i;
      break;
    }
  }

  return activeIndex;
}

function getNearTab(diff) {
  return getTabs()
    .then(tabs => {
      const activeIndex = getActiveTabIndex(tabs);
      const nextIndex = (activeIndex + diff + tabs.length) % tabs.length;
      chrome.tabs.update(tabs[nextIndex].id, { active: true });
    });
}

function activateTab([url]) {
  return getTabs()
    .then(tabs => {
      const normalized = (
        url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0 ?
          `http://${url}` : url
      );

      const normalizedUrl = new URL(normalized);
      const tab = tabs.find(tab => {
        const url = new URL(tab.url);

        if (url.hostname === normalizedUrl.hostname && url.pathname === normalizedUrl.pathname) {
          return true;
        }
      });

      if (tab) {
        chrome.tabs.update(tab.id, { active: true });
      } else {
        chrome.tabs.create({ url: normalized });
      }
    })
}
