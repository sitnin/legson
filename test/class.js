"use strict";

const LegSON = require("../");

const should = require('should');

describe("Class", () => {
    it("creates an object with defaults", () => {
        const t = new LegSON();

        should(t).instanceOf(LegSON);

        should(t).have.property('_opts', {
            maxValueLength: 250,
            nullNonExistent: true,
            addPlugins: [],
        });
    });

    it("creates an object with overrides", () => {
        const t = new LegSON({
            maxValueLength: 100,
            nullNonExistent: false
        });

        should(t).instanceOf(LegSON);

        should(t).have.property('_opts', {
            maxValueLength: 100,
            nullNonExistent: false,
            addPlugins: [],
        });
    });
});
