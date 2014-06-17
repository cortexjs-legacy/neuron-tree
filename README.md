# neuron-tree [![NPM version](https://badge.fury.io/js/neuron-tree.svg)](http://badge.fury.io/js/neuron-tree) [![Build Status](https://travis-ci.org/cortexjs/neuron-tree.svg?branch=master)](https://travis-ci.org/cortexjs/neuron-tree) [![Dependency Status](https://gemnasium.com/cortexjs/neuron-tree.svg)](https://gemnasium.com/cortexjs/neuron-tree)

Utilities to generate the `config.tree` for [neuron](https://github.com/kaelzhang/neuron).

## Install

```bash
$ npm install neuron-tree --save
```

## Usage

```js
var tree = require('neuron-tree');
tree.parse(shrinked);
```

### tree.parse(shrinked, types)

- shrinked `Object` the shrinked object of [shrinked](https://www.npmjs.org/package/shrinked)
- types `Array` the array of types of dependencies, default to 

  [
    "dependencies",
    "asyncDependencies"
  ]

  you could include other types of dependencies in the array.

Parses the shrinked B+ tree, and generates a simpler tree for `config.tree` of neuron.

```
<name>: {
  <version>: {
    // dependencies and async dependencies
    <dep-name>: {
      <dep-range>: <dep-version>
    }
  }
}
```

## License

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->