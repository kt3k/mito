# mito v1.0.0 [![Build Status](https://travis-ci.org/kt3k/mito.svg)](https://travis-ci.org/kt3k/mito) [![npm version](https://img.shields.io/npm/v/mito.svg)](https://www.npmjs.com/package/mito)

> micro-templating function

This is forked from John Resig's [micro-templating](http://ejohn.org/blog/javascript-micro-templating/).

Just 199B minified.

# Syntax

Similar to `.ejs`

```ejs
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <ul>
      <% items.forEach(function (item) { %>
        <li><a href="<%= item.url %>"><%= item.name %></a></li>
      <% }) %>
    </ul>
  </body>
</html>
```

With the above string, the following renders it.

```js
mito(above)({title: 'Hello', items: [
  {name: 'Linux', url: 'https://github.com/torvalds/linux'},
  {name: 'XNU', url: 'https://github.com/opensource-apple/xnu'},
  {name: 'Hurd', url: 'https://www.gnu.org/software/hurd/hurd.html'}
]})
```

# API

```js
var mito = require('mito')
```

## mito(str)

- @param {String} str The template string

Returns template function compiled with the given template string.

## mito(str)(obj)

- @param {Object} obj The template parameter

Returns the rendered string with template parameter

# Feature / Restriction

- 199B minified
- No cache mechanism
- No include/import/require support
- All whitespaces in template are converted into space (0x20)
- Unable to use % in javascript code

# License

MIT
