# tap-vibrant

Receives streaming TAP and outputs a colorful, indented representation.

Similar to [tap-spec](https://www.npmjs.com/package/tap-spec) without any summary at the end. It just formats blocks of TAP. This package is a building block for a full TAP reporter like [tap-dapper](https://www.npmjs.com/package/tap-dapper).

## install

```sh
npm install tap-vibrant
```

## example

```sh
tape **/*.test.js | tap-vibrant
```

```js
const vibrant = require('tap-vibrant')

process.stdin
  .pipe(vibrant())
  .pipe(process.stdout)
```
