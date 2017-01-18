"use strict";

const should = require('should');

describe("Loaders", () => {
    describe("Bundled", () => {
        describe("json", () => {
            const load = require("../lib/loaders/json");

            it("Loads plain JSON", () => {
                //noinspection JSUnresolvedFunction
                return load("./test/data/data.json").then(data => {
                    should(data).instanceOf(Object);
                    should(data).have.property("foo", "bar");
                    should(data).have.property("baz", 123);
                    should(data).have.property("arr", "@json://data_array.json");
                    should(data).have.property("inner", { "md": "@md://data.md" });
                });
            });

            it("Loads JSON5", () => {
                //noinspection JSUnresolvedFunction
                return load("./test/data/data_5.json").then(data => {
                    should(data).instanceOf(Object);
                    should(data).have.property("test", "json5 parsed!");
                });
            });
        });

        it("markdown");
        it("url");
    });

    it("Additional");
});
