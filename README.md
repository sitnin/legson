# Extensible lego-like JSON file loader

This library is intended to load a JSON object from multiple files in multiple formats.

It allows you to construct an object with key values which contains some external url data, html text from markdown source files, other json files and so on.

Library is based on perfect JSON5 library, so it supports JSON5 file format right out of the box.

## Installation

    $ npm i --save legson

Library exports a default class named LegSON

## Usage example

    "use strict";

    const LegSON = require("legson");

    const opts = {
        maxValueLength: 250,
        nullNonExistent: true,
        addLoaders: [
            [/^@test:\/\//, value => {
                return new Promise.resolve(value);
            }],
        ],
    };

    const loader = new LegSON(opts);
    loader.load("path/to/root/file.json").then(obj => {
        console.log(obj);
    }).catch(err => {
        console.error(err.stack || err.message);
    });

## Methods

### new LegSON(opts)

Creates new LegSON object with configuration

### .load(filename)

Return promise of JSON object value which will be fulfilled when all values will be processed

## Options

### maxValueLength (integer, default: 250)

Sets maximum key value length that will be checked with loaders

### nullNonExistent (bool, default: true)

If `true` every loader-matched but failed values will be nullified. Otherwise, values will be left intact.

### addLoaders (array of arrays, no default value)

Additional value loaders array. Should consists of pairs of `[regexp, processor]` where processor should be a function returning value or promise of value.

## Contacts

Feel free to contact me via email greg@sitnin.com or send pull requests via Github.

## License

MIT
