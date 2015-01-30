# Redirectify

A transformer for [Browserify](http://browserify.org) which overrides the required file when a specified subdirectory with a file of the same name exists.

Works in combination with other transformers such as [hbsfy](https://github.com/epeli/node-hbsfy).

## Installation

Using npm:

```
npm install redirectify browserify
```

## Usage

Redirectify requires a specific directory structure when overriding:

    .
    +-- file
    +-- overridingDir
    |   +-- file

The file to be overridden and the overriding file must have the same name.
If a matching directory or file is not found then the original is used.

### Config With Browserify

When executing browserify you can specify redirectify as a transformer in your `package.json`:

    {
      "name": "foo",
      ...
      "browserify": {
        "transform: ["redirectify"]
      }
    }

Also withing your `package.json` you should provide the `overrideDir` as config for redirectify:

    {
      "browserify": ...
      "redirectify": {
        "dir": "dir/to/nest/to"
      }
    }

For example for the above directory structure your `package.json` should look like this:

    {
      "name": "foo",
      ...
      "browserify": {
        transform: ["redirectify"]
      },
      "redirectify": {
        "dir": "overridingDir"
      }
    }
    
For this example Browserify will now include `./overrideDir/file` instead of `./file`.

If the specified directory or override file with the same name do not exist then the original
will acts as a default.

## Tests

run the tests with

```
npm test
```