import { promise, sync } from './plugin';
import scrollTo from './utils/scroll';

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
    },
    {
      name: 'close-right',
      exec: promise(() => closeNearTab(1))
    },
    {
      name: 'close-left',
      exec: promise(() => closeNearTab(-1))
    },
    {
      name: 'scroll-up',
      isContentScript: true,
      exec: sync(() => scroll(-500))
    },
    {
      name: 'scroll-down',
      isContentScript: true,
      exec: sync(() => scroll(+500))
    }
  ]
};

function scroll(diff) {
  const top = document.body.scrollTop;
  scrollTo(top + diff);
}

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
  return tabs.findIndex(t => t.active);
}

function getNearTab(diff) {
  return getTabs()
    .then(tabs => {
      const activeIndex = getActiveTabIndex(tabs);
      const nextIndex = (activeIndex + diff + tabs.length) % tabs.length;
      chrome.tabs.update(tabs[nextIndex].id, { active: true });
    });
}

function closeNearTab(diff) {
  return getTabs()
    .then(tabs => {
      const activeIndex = getActiveTabIndex(tabs);
      const nextIndex = activeIndex + diff;

      if (nextIndex >= 0 && nextIndex < tabs.length) {
        return new Promise((resolve, reject) => {
          chrome.tabs.remove(tabs[nextIndex].id, () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            }

            resolve();
          });
        });
      }
    });
}

function activateTab([url]) {
  return getTabs()
    .then(tabs => {
      const normalized = (
        url.indexOf('http://') !== 0 &&
        url.indexOf('https://') !== 0 &&
        url.indexOf('chrome-extension://') !== 0 ?
          `http://${url}` : url
      );

      const normalizedUrl = new URL(normalized);
      const tab = tabs.find(tab => {
        const url = new URL(tab.url);

        if (url.hostname === normalizedUrl.hostname && url.pathname === normalizedUrl.pathname) {
          const params = {
            active: true
          };

          if (url.hash !== normalizedUrl.hash) {
            params.url = normalizedUrl.href;
          }

          chrome.tabs.update(tab.id, params);
          return true;
        }
      });

      if (!tab) {
        chrome.tabs.create({ url: normalized });
      }
    })
}
