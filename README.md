# Xavier chrome extension

A Chrome extension for [Xavier](https://github.com/ewnd9/xavier) Remote Control CLI

## Commands

```
$ xavier chrome/tabs
$ xavier chrome/active-tab
$ xavier chrome/activate-tab <url>

$ xavier chrome/move-right
$ xavier chrome/move-left
$ xavier chrome/close-right
$ xavier chrome/close-left

$ xavier chrome/scroll-up
$ xavier chrome/scroll-down

$ xavier play.google.com/play-or-pause
$ xavier play.google.com/prev
$ xavier play.google.com/next

$ xavier vk.com/play-or-pause
$ xavier vk.com/prev
$ xavier vk.com/next

$ xavier youtube.com/play-or-pause
```

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

## License

MIT © [ewnd9](http://ewnd9.com)
