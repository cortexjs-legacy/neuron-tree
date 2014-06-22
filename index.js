'use strict';

// @param {Object} shrinked
// ```
// <name>: {
//   <version>: {
//     dependencies: {
//       <dep-name>: {
//         <dep-range>: <dep-version>
//       }
//     },

//     asyncDependencies: ...,
//     devDependencies: ...
//   }
// }
// ```
// @param 
exports.parse = function (shrinked, types) {
  var parsed = {};
  types || (types = DEFAULT_TYPES);
  exports._each(shrinked, function (name, version, deps) {
    var merged_sync_deps = {};
    var merged_async_deps = {};

    // Maintains order, and the latter one has higher priority.
    TYPES.forEach(function (type) {
      if (~types.indexOf(type) && (type in deps)) {
        var dest = IS_ASYNC[type]
          ? merged_async_deps
          : merged_sync_deps;
        exports._merge(dest, deps[type]);
      }
    });

    if (
      exports._is_empty(merged_sync_deps)
      && exports._is_empty(merged_async_deps)
    ) {
      return;
    }

    var versions = parsed[name] || (parsed[name] = {});
    versions[version] = [merged_sync_deps, merged_async_deps];
  });

  return parsed;
};


var TYPES = [
  "devDependencies",
  "asyncDependencies",
  "dependencies",
  "engines"
];

var IS_ASYNC = {
  "devDependencies": false,
  "asyncDependencies": true,
  "dependencies": false,
  "engines": false
};

var DEFAULT_TYPES = [
  "asyncDependencies",
  "dependencies"
];


// double each
exports._each = function (object, iterator) {
  var a;
  var value;
  var b;
  var c;
  for (a in object) {
    value = object[a];
    for (b in value) {
      c = value[b];
      iterator(a, b, c);
    }
  }
};


exports._is_empty = function (object) {
  var key;
  for (key in object) {
    return false;
  }
  return true;
};


// Deep merge
exports._merge = function (receiver, supplier){
  if (Object(supplier) !== supplier) {
    return;
  }

  exports._each(supplier, function (name, range, version) {
    var ranges = receiver[name] || (receiver[name] = {});
    ranges[range] = version;
  });
};
