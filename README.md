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
        maxValueLength: 100,
        nullNonExistent: true,
        parseArrays: true,
        addPlugins: {
            "test": value => {
                return new Promise.resolve(value);
            },
        },
    };

    const loader = new LegSON(opts);
    loader.load("file.json").then(obj => {
        console.log(loader._opts);
        console.log(obj);
    }).catch(err => {
        console.error(err.stack || err.message);
    });

**Important:** any pathnames inside loaded JSON files will NOT be expanded or normalized. They always will be searched from the current directory. You should use absolute paths if you can't set working directory to the root json's folder.

## Methods

### new LegSON(opts)

Creates new LegSON object with configuration

### .load(filename)

Return promise of JSON object value which will be fulfilled when all values will be processed

## Configuration options

### maxValueLength (integer, default: 100)

Sets maximum key value length that will be checked with loaders

### nullNonExistent (bool, default: true)

If `true` every loader-matched but failed values will be nullified. Otherwise, values will be left intact.

### addLoaders (array of arrays, no default value)

Additional value loaders dictionary. Where the key of the array is a prefix for `@[prefix]` pattern matching and value is a function returning new value or promise of a value.

### processArrays

If `true` values inside arrays will be processed as well. Otherwise arrays will be left itact.

## Bundled loaders

Each source object key's value will be tested for `"@[loader]"` prefix. If prefix will be found, proper loader will be used to load real content of the particular key.

Result of each loader will be parsed again like this contents was already there. This logic makes possible to include data recursively :)

### @[raw]

Will load file contents and will not do anything else. I.e. use this to load html which you will send to the browser.

### @[json]

Will load file contents and parse it with JSON5 library. Result is a json-object.

### @[md]

Loads file and parses it from markdown to html.

### @[url]

Performs get url request and returns raw reply body to the object's key.

## TODO

- Write full documentation ;)
- Add "asis" loader for loading file contents without processing
- Write tests for configuration options
- Resolve issue with dataPath patching (conflicts with url loader)

## Contacts

Feel free to contact me via email greg@sitnin.com or send pull requests via Github.

## License

MIT
