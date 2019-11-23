"use strict";
const assert = require("chai").assert;
const TextLineBuffer = require("../lib/text-line-buffer.js");
describe("TextLineBuffer", () => {
    describe(".getRowByteSizeOf", () => {
        it("should add a CR-LF to EOL and return a byte length of the text, when it does not exist", () => {
            assert.equal(TextLineBuffer.getRowByteSizeOf("ABC"), 5);
        });
        it("should return a byte length of the text if it has CR-LF at EOL", () => {
            assert.equal(TextLineBuffer.getRowByteSizeOf("ABC\r\n"), 5);
        });
    })
    describe("#push", ()=> {
        describe("#getByteSize", ()=> {
            it("should count a byte length", () => {
                const buf = new TextLineBuffer();
                buf.push("ABC");
                assert.equal(buf.getByteSize(), 5);
                buf.push("ABC");
                assert.equal(buf.getByteSize(), 10);
            });
            it("should not add extra CR-LF", () => {
                const buf = new TextLineBuffer();
                buf.push("ABC\r\n");
                assert.equal(buf.getByteSize(), 5);
                buf.push("ABC\r\n");
                assert.equal(buf.getByteSize(), 10);
            });
        });
        describe("#toString", ()=> {
            it("should count a byte length", () => {
                const buf = new TextLineBuffer();
                buf.push("ABC");
                buf.push("DEF");
                assert.equal(buf.toString(), "ABC\r\nDEF\r\n");
            });
            it("should not add extra CR-LF", () => {
                const buf = new TextLineBuffer();
                buf.push("ABC\r\n");
                buf.push("DEF\r\n");
                assert.equal(buf.toString(), "ABC\r\nDEF\r\n");
            });
        });
    });
    describe("#clear", ()=> {
        it("should clear a byte length", () => {
            const buf = new TextLineBuffer();
            buf.push("ABC");
            buf.push("DEF");
            buf.clear();
            assert.equal(buf.getByteSize(), 0);
        });
    });
    describe("#isEmpty", ()=> {
        it("should return true after constructed", () => {
            const buf = new TextLineBuffer();
            assert.isTrue(buf.isEmpty());
        });
        it("should return false after pushed", () => {
            const buf = new TextLineBuffer();
            buf.push("ABC");
            assert.isFalse(buf.isEmpty());
        });
        it("should return true after cleared", () => {
            const buf = new TextLineBuffer();
            buf.push("ABC");
            buf.clear();
            assert.isTrue(buf.isEmpty());
        });
    });
});