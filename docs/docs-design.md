## Design (not edited in 2016)

The extension itself contains a logic for interacting with browser pages and sends them
to a desktop app on establishing connection (`src/js/background.jsx`) in the following format:

```
event: 'init'
commands: [
  {
    id: '<>',
    group: '<>',
    domain: '<>'
  }
]
```

The desktop app sends events like:

```
event: 'action'
data: {
  id: '< from above >'
}
```

On each event we simply iterate through all tabs and if command belongs to website form tab we propogate event to content-script (`src/js/content.jsx`)  which simply executes it.

There is also `src/js/index.jsx` - script for extension's popup window which has some controls for manually executing commands
