# Redirectify

A transformer for [Browserify](http://browserify.org) which overrides the required file with the contents of a file of the same name in a specified directory (if such a file exists).

Works in combination with other transformers such as [hbsfy](https://github.com/epeli/node-hbsfy).

## Installation

Using npm:

```
npm install redirectify browserify --save
```

## Usage

In it's simplest form Redirectify requires a specific directory structure when overriding:

    .
    ├ file.txt
    ├ overridingDir
    │ └ file.txt

When the top level `file.txt` is required by Browserify `overridingDir/file.txt` is loaded instead.
Using the `base` option you can specify entire directories to override. 
If no override is found then the original is used.

*The file to be overridden and the overriding file must have the same name.*

*If a matching directory or file is not found then the original is used.*

### Options

`dir`  - relative path to the directory containing the overriding file

`base` - [optional] used for specifying the common root for overriding sub directories


### Config

#### With Package.json

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
    
For this example Browserify will now include `./overridingDir/file` instead of `./file`.

If the specified directory or override file with the same name do not exist then the original
will acts as a default.



#### On the command line

Alternatively you can specify the transform option on the command line:

```
browserify input.js -t [ redirectify --dir overridingDir ] -o output.js
```

You can also overwrite the config by using an environment variable:

```
REDIRECT_DIR=overridingDir browserify input.js -t redirectify  -o output.js
```

#### Overriding deeply nested files

If you require the overriding of deeply nested files you can use the `base` option to specify where the redirection
should begin.

For instance, with the following directory structure:

     .
     ├ project
     │ ├ src
     │ │ └ subDir
     │ │   ├ nestedSubDir
     │ │   │ └ otherFile.txt
     │ │   └ file.txt
     │ └ override
     │   └ subDir
     │     ├ nestedSubDir
     │     │ └ otherFile.txt
     │     └ file.txt
     
And the following config:

    {
      "name": "foo",
      ...
      "browserify": {
        transform: ["redirectify"]
      },
      "redirectify": {
        "dir": "../override",
        "base": "/path/to/project"
      }
    }

Requiring `project/src/subDir/file.txt` will load `project/override/subDir/file.txt`. This works in a nested fashion so
requiring `project/src/subDir/nestedSubDir/otherFile.txt` will load `project/override/subDir/nestedSubDir/otherFile.txt`.

## Tests

run the tests with

```
npm test
```

## Change history
# 1.3
- Adds support for overriding contents of subdirectories.

# 1.2
- Adds support for setting config on the command line with `--dir`.

# 1.1
- Adds support for setting config using environment variables.