# neuron-tree [![NPM version](https://badge.fury.io/js/neuron-tree.svg)](http://badge.fury.io/js/neuron-tree) [![Build Status](https://travis-ci.org/cortexjs/neuron-tree.svg?branch=master)](https://travis-ci.org/cortexjs/neuron-tree) [![Dependency Status](https://gemnasium.com/cortexjs/neuron-tree.svg)](https://gemnasium.com/cortexjs/neuron-tree)

Utilities to generate the `config.tree` for [neuron](https://github.com/kaelzhang/neuron).

```
<name>: {
  <version>: {
    // dependencies and async dependencies
    <dep-name>: [
      // synchronous dependencies
      {
        <sync-dep-range>: <sync-dep-version>
        ...
      },
      // asynchronous dependencies
      {
        <async-dep-range>: <async-dep-version>
        ...
      }
    ]
  }
}
...
```

## Install

```bash
$ npm install neuron-tree --save
```

## Usage

```js
var tree = require('neuron-tree');
tree.parse(shrinked);
```

### tree(cwd, pkg, [options], callback)

- cwd
- pkg `Object` cortex json
- options
  - built_root `path=`
  - shrinkwrap `Object=`

### tree.parse(shrinked, dependencyKeys)

- shrinked `Object` the shrinked object of [shrinked](https://www.npmjs.org/package/shrinked)
- dependencyKeys `Array.<type>` the array of types of dependencies, default to 

  [
    "dependencies",
    "asyncDependencies"
  ]

  you could include other keys of dependencies in the array.

- type `String` available keys: `'dependencies'`, `'asyncDependencies'`, `'engines'`, `devDependencies`

Parses the shrinked B+ tree, and generates a simpler tree for `config.tree` of neuron.

## License

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->