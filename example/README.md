Redirectify Example
---

## The default example
Browserify will be installed as a dev dependency, we can therefore run it from the node_modules directory.
(If you have Browserify installed globally feel free to use that instead.)

To set up the example environment:

`cd example && npm install`

Then to build the default app:
`./node_modules/.bin/browserify index.js -o app.js`

This will build the default bundle using `/example/file.js`.
Open `/example/index.html` in your browser and you should see "foo/file" outputted to the page.

For the following examples run the specified command then refresh your browser to see the change.

## Override with suffix
`./node_modules/.bin/browserify index.js -t [ redirectify --suffix="-suffix" ] -o app.js`
returns "foo/file-suffix"

## Override with prefix
`./node_modules/.bin/browserify index.js -t [ redirectify --prefix="prefix-" ] -o app.js`
returns "foo/prefix-file"

## From nested directory
`./node_modules/.bin/browserify index.js -t [ redirectify --dir="baz" ] -o app.js`
returns "foo/baz/file"

## From relative path directory
`./node_modules/.bin/browserify index.js -t [ redirectify --base="foo" --dir="../bar" ] -o app.js`
returns "foo/bar/file"