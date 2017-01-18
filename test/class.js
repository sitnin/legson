"use strict";

const LegSON = require("../");

const should = require('should');

describe("Class", () => {
    it("creates an object with defaults", () => {
        const obj = new LegSON();

        should(obj).instanceOf(LegSON);
        should(obj).have.property('_opts');
        should(obj).have.propertyByPath("_opts", "maxValueLength").Number(100);
        should(obj).have.propertyByPath("_opts", "nullNonExistent").true();
        should(obj).have.propertyByPath("_opts", "addPlugins").empty();
    });

    it("creates an object with overrides", () => {
        const obj = new LegSON({
            maxValueLength: 1000,
            nullNonExistent: false,
            addPlugins: {
                "test": val => { return val }
            }
        });

        should(obj).instanceOf(LegSON);
        should(obj).have.property("_opts");
        should(obj).have.propertyByPath("_opts", "maxValueLength").Number(1000);
        should(obj).have.propertyByPath("_opts", "nullNonExistent").false();
        should(obj).have.propertyByPath("_opts", "addPlugins", "test").Function();
    });
});
