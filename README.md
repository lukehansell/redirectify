# Redirectify

A transformer for [Browserify](http://browserify.org) to override the returned file from require().

## Installation

Using npm:

```
npm install redirectify browserify --save
```

## Usage

Browserify bundles together files referenced using the `require()` function.
When a call to `require()` is made Redirectify will step in and return a file matching a specified format where available.
If the file to override with does not exist then the deault is used instead.

Redirectify can redirect the require call based on a file prefix, suffix or directory.
For examples of these in action see the examples in this repo.


### Options
* `prefix` - text to prepend to the filename 
    #### Example
    with "foo" a call to "bar.js" becomes "foobar.js"

* `suffix` - text to append to the filename 
    #### Example
    with "foo" a call to "bar.js" becomes "barfoo.js"

* `dir`  - relative path to the directory containing the overriding file
    #### Example
    with "foo" a call to "bar.js" becomes "foo/bar.js"

* `base` - [optional] used for specifying the common root for overriding sub directories
    #### Example
    with base="foo" and dir="../baz" a call to "foo/other/bar.js" becomes "baz/other/bar.js"

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
browserify input.js -t [ redirectify --dir="overridingDir" ] -o output.js
```

You can also overwrite the config by using an environment variable:
**This will be deprecated in a future release**
```
REDIRECT_DIR=overridingDir browserify input.js -t redirectify  -o output.js
```

#### Overriding deeply nested files

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
# 1.4
- Adding support for prefix and suffix redirection.

# 1.3
- Adds support for overriding contents of subdirectories.

# 1.2
- Adds support for setting config on the command line with `--dir`.

# 1.1
- Adds support for setting config using environment variables.