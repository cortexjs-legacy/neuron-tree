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
    var merged_deps = {};
    var versions = parsed[name] || (parsed[name] = {});

    // Maintains order, and the latter one has higher priority.
    TYPES.forEach(function (type) {
      if (~types.indexOf(type) && (type in deps)) {
        exports._mix(merged_deps, deps[type]);
      }
    });

    versions[version] = merged_deps;
  });

  return parsed;
};


var TYPES = [
  "devDependencies",
  "asyncDependencies",
  "dependencies",
  "engines"
];

var DEFAULT_TYPES = [
  "asyncDependencies",
  "dependencies"
];

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


exports._mix = function (receiver, supplier, override){
  var key;

  if(arguments.length === 2){
    override = true;
  }

  if (Object(supplier) !== supplier) {
    return;
  }

  for(key in supplier){
    if(override || !(key in receiver)){
        receiver[key] = supplier[key]
    }
  }
};
