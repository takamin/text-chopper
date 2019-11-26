"use strict";
const inWeb = ("window" in Function("return this")());
const debug = require("debug")("TextLineBuffer");

class TextLineBuffer {
    constructor() {
        debug(`constructor`);
        this.buffer = [];
        this.byteSize = 0;
    }
    clear() {
        debug(`#clear`);
        this.buffer = [];
        this.byteSize = 0;
    }
    isEmpty() {
        debug(`#isEmpty ${this.buffer.length == 0}`);
        return this.buffer.length == 0;
    }
    push(row) {
        debug(`#push(${row}) this.buffer has ${this.buffer.length + 1} lines`);
        const text = row.replace(/\r\n$/, "");
        this.byteSize += TextLineBuffer.getRowByteSizeOf(text);
        this.buffer.push(text);
    }
    getByteSize() {
        debug(`#getByteSize() returns ${this.byteSize}`);
        return this.byteSize;
    }
    toString() {
        debug(`#toString() returns string of ${this.buffer.length} lines`);
        return `${this.buffer.join(TextLineBuffer.EOL)}${TextLineBuffer.EOL}`;
    }
}
TextLineBuffer.EOL = "\r\n";
TextLineBuffer.getRowByteSizeOf = row =>  {
    debug(`.getRowByteSizeOf ${row}`);
    const text = row + (row.match(/\r\n$/) ? "":TextLineBuffer.EOL);
    if(inWeb) {
        const blobLine = new Blob([text]);
        return blobLine.size;
    }
    return Buffer.byteLength(text);
};

module.exports = TextLineBuffer;
