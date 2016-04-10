# Docs

Welcome to the documentation of the `xavier-browsers` project.

```
src/js
├── background.js
├── badge.js
├── commands.js
├── content.js
└── index.js
```

## `background.js`

- Connects to backend via websocket
- Gets commands from backend and propagate them to pages

## `badge.js`

- Update extension icon in browser

## `commands.js`

- Contains the commands to interact with web pages

## `content.js`

- Injected in web pages, gets commands and executes them in a contextes of pages

## `index.js`

- Popup script 
