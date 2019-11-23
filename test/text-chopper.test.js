"use strict";
const assert = require("chai").assert;
const TextChopper = require("../lib/text-chopper.js");
describe("TextChopper", () => {
    describe(".chop", () => {
        it("should returns an array contains TWO elements", () => {
            const result = TextChopper.chop("ABC\r\nDEF\r\nGHI\r\nJKL\r\n", { chunkSize: 12 });
            assert.equal(result.length, 2);
        });
        it("should contains an specific TWO lines that does not exceed the size threshold", () => {
            const result = TextChopper.chop("ABC\r\nDEF\r\nGHI\r\nJKL\r\n", { chunkSize: 12 });
            assert.equal(result[0], "ABC\r\nDEF\r\n");
            assert.equal(result[1], "GHI\r\nJKL\r\n");
        });
        it("should returns an array contains FOUR elements", () => {
            const result = TextChopper.chop("ABC\r\nDEF\r\nGHI\r\nJKL\r\n", { chunkSize: 6 });
            assert.equal(result.length, 4);
        });
        it("should contains an specific ONE line that does not exceed the size threshold", () => {
            const result = TextChopper.chop("ABC\r\nDEF\r\nGHI\r\nJKL\r\n", { chunkSize: 6 });
            assert.equal(result[0], "ABC\r\n");
            assert.equal(result[1], "DEF\r\n");
            assert.equal(result[2], "GHI\r\n");
            assert.equal(result[3], "JKL\r\n");
        });
        it("should contains an specific ONE line that exceeds the threshold", () => {
            const result = TextChopper.chop("ABC\r\nDEF\r\nGHI\r\nJKL\r\n", { chunkSize: 3 });
            assert.equal(result[0], "ABC\r\n");
            assert.equal(result[1], "DEF\r\n");
            assert.equal(result[2], "GHI\r\n");
            assert.equal(result[3], "JKL\r\n");
        });
    })
});