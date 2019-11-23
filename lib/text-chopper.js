"use strict";
const TextLineBuffer = require("./text-line-buffer.js");

class TextChopper {}

/**
 * Chop a text to small chunks.
 * 
 * @param {string} text input text
 * @param {object} options an options for this instance
 * @returns {Array<string>} A chopped result
 * 
 * A schema of the parameter `options`:
 * ```yaml
 * type: object
 * properties:
 *  chunkSize:
 *      type: number
 *      description: A maximum byte size of each chunk of the result
 * ```
 */
TextChopper.chop = (text, options) => {
    const { chunkSize } = options; 
    const buffer = new TextLineBuffer();
    const rows = text.trim().split(TextLineBuffer.EOL);
    const divCsvList = [];
    const push = () => {
        divCsvList.push(buffer.toString());
        buffer.clear();
    }
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowSize = TextLineBuffer.getRowByteSizeOf(row);
        const estSize = buffer.getByteSize() + rowSize;
        if(!buffer.isEmpty() && estSize >= chunkSize) {
            push();
        }
        buffer.push(row);
    }
    if(!buffer.isEmpty()) {
        push();
    }
    return divCsvList;
};

module.exports = TextChopper;
