"use strict";
const inWeb = ("window" in Function("return this")());
class TextLineBuffer {
    constructor() {
        this.buffer = [];
        this.byteSize = 0;
    }
    clear() {
        this.buffer = [];
        this.byteSize = 0;
    }
    isEmpty() {
        return this.buffer.length == 0;
    }
    push(row) {
        const text = row.replace(/\r\n$/, "");
        this.byteSize += TextLineBuffer.getRowByteSizeOf(text);
        this.buffer.push(text);
    }
    getByteSize() {
        return this.byteSize;
    }
    toString() {
        return `${this.buffer.join(TextLineBuffer.EOL)}${TextLineBuffer.EOL}`;
    }
}
TextLineBuffer.EOL = "\r\n";
TextLineBuffer.getRowByteSizeOf = row =>  {
    const text = row + (row.match(/\r\n$/) ? "":TextLineBuffer.EOL);
    if(inWeb) {
        const blobLine = new Blob([text]);
        return blobLine.size;
    }
    return Buffer.byteLength(text);
};

module.exports = TextLineBuffer;
