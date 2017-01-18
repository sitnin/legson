"use strict";

const LegSON = require("../");

const should = require('should');

describe("Configurables", () => {
    describe("maxValueLength", () => {
        it("checks 250 by default");
        it("checks only 50");
        it("checks only 10");
    });

    describe("nullNonExistent", () => {
        it("when true");
        it("when false");
    });
});
