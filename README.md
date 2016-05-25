# Xavier chrome extension

[WIP] Contol Chrome via websocket bridge in a Chrome extension from CLI

## Commands

```
chrome/tabs
chrome/active-tab
chrome/activate-tab <url>
chrome/move-right
chrome/move-left

play.google.com/play-or-pause
play.google.com/prev
play.google.com/next

vk.com/play-or-pause
vk.com/prev
vk.com/next

youtube.com/play-or-pause
```

## Why not webdriver?

According to
https://sqa.stackexchange.com/questions/317/attach-to-browser-not-spawned-by-selenium2 it is not that easy.

## Install

```sh
$ npm install
```

## Development

```sh
$ npm run build:watch
```

## Usage

1. Build dist (src/dist)

```sh
$ npm run build
```

2. Open Chrome
3. Open "chrome://extensions/"
4. Click "Load unpacked extensions"
5. Select the dist directory (src/dist)

## CLI interaction

[Overview](cli/README.md)

## icon source

http://www.iconarchive.com/show/button-ui-system-apps-icons-by-blackvariant/X11-icon.html
