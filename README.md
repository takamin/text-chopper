text-chopper
============

Divide a long text to small chunks.
The text is divided at just the end of line.
The byte length of each chunks are smaller than a size specified by
`chunkSize` of parameter `options`.

This is available on both of browser and node.js

## USAGE

Import this module by the CommonJS way.

```javascript
const TextChopper = require("text-chopper");

const text = [
    "ABCDEFG",
    "HIJKLMN",
    "OPQRSTU",
].join("\r\n");

const chunks = TextChopper.chop(
    text, {chunkSize: 10});

// chunks[0] == "ABCDEFG\r\n"
// chunks[1] == "HIJKLMN\r\n"
// chunks[2] == "OPQRSTU\r\n"
```

## INSTALLATION

Use npm to install.

```bash
$ npm install --save text-chopper
```
