# Overridify

A transformer for [Browserify](http://browserify.org) which overrides the required file when a specified subdirectory with a file of the same name exists.

Works in combination with other transformers such as [hbsfy](https://github.com/epeli/node-hbsfy).

## Installation

Using npm:

```
npm install overridify browserify
```

## Usage

Overridify requires a specific directory structure when overriding:

    .
    +-- file
    +-- overridingDir
    |   +-- file

The file to be overridden and the overriding file must have the same name.
If a matching directory or file is not found then the original is used.

### With Browseify

When executing browserify you can specify overridify as a transformer in your `package.json`:

    {
      "name": "foo",
      ...
      "browserify": {
        "transform: ["overridify"]
      }
    }

Also withing your `package.json` you should provide the `overrideDir` as config for overridify:

    {
      "browserify": ...
      "overridify": {
        "overrideDir": "dir/to/nest/to"
      }
    }

For example for the above directory structure your `package.json` should look like this:

    {
      "name": "foo",
      ...
      "browserify": {
        transform: ["overridify"]
      },
      "overridify": {
        "overrideDir": "overridingDir"
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