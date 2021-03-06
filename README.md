\_part\_
========

This micro library encourages functional programming by making native methods available as partially
applied functions.

```javascript
//typical receiver-method-arguments pattern
[1,2,3].map( function (n) { return n + 1; } ); // [2,3,4]
```

The "left-part" functions prepend the method name with an underscore and expect the receiver as
the first argument in the first invocation.

```javascript
_map( [1,2,3] )( function (n) { return n + 1; } ); // [2,3,4]
```

The "right-part" functions suffix the method name with an underscore and expect the receiver as
the first argument in the function returned by the first invocation.

```javascript
map_( function (n) { return n + 1; } )( [1,2,3] ); // [2,3,4]
```

See the [docs](http://autosponge.github.io/_part_/build/docs/part.html).

Try the [live demo](http://autosponge.github.io/_part_/demo/repl.html).

## Getting Started

`npm install part`

Or just download and include the build file `/build/src/part.min.js`

>**Note**:
>
>As soon as "`node --harmony`" supports the rest and spread operators, you will be able to run the src file instead of the build file.

See the following examples of how to include \_part\_.

### Custom namespace;

```javascript
// NodeJS example
var _part_ = require( "part" );
var util = {};
_part_._borrow( util )( Array.prototype, "reduce" );
function add( a, b ) { return +a + +b; }
util.sum = util.reduce_( add );
module.exports = util;
```

```html
<!-- Browser example -->
<script src="build/src/part.min.js">
<script>
(function (global, util) {
  function add( a, b ) { return +a + +b; }
  _part_._borrow( util )( Array.prototype, "reduce" );
  util.sum = util.reduce_( add );
  global.util = util;
}(this, {}));
util.sum([1,2,3]); //6
</script>

```

### Extending the \_part\_ namespace;

```javascript
// NodeJS example
var _part_ = require( "part" );
_part_.borrow( Array.prototype, "reduce" );
function add( a, b ) { return +a + +b; }
var sum = _part_.reduce_( add );
sum([1,2,3]); //6
```

```html
<!-- Browser example -->
<script src="build/src/part.min.js">
<script>
function add( a, b ) { return +a + +b; }
_part_.borrow( Array.prototype, "reduce" );
var sum = _part_.reduce_( add );
sum([1,2,3]); //6
</script>

```

### Non-namespaced utilities

```javascript
// NodeJS example
var _part_ = require("part");
//not global
var reduce_ = _part_.create_(Array.prototype.reduce);
function add( a, b ) { return +a + +b; }
var sum = reduce_( add );
sum([1,2,3]); //6
```

```html
<!-- Browser example -->
<script src="build/src/part.min.js">
<script>
function add( a, b ) { return +a + +b; }
_part_._borrow( this )( Array.prototype, "reduce" );
var sum = reduce_( add );
sum([1,2,3]); //6
</script>

```

### Global utilities

```javascript
// NodeJS example
var _part_ = require( "part" );
[
    "concat", "every", "filter", "forEach", "join",
    "lastIndexOf", "map", "push", "pop", "reduce",
    "reduceRight", "reverse", "shift", "slice",
    "some", "sort", "splice", "unshift"
//global
].forEach( _part_._borrow( global, Array.prototype ) );
```

```html
<!-- Browser example -->
<script src="build/src/part.min.js">
<script>
[
    "concat", "every", "filter", "forEach", "join",
    "lastIndexOf", "map", "push", "pop", "reduce",
    "reduceRight", "reverse", "shift", "slice",
    "some", "sort", "splice", "unshift"
].forEach( _part_._borrow( this, Array.prototype ) );
</script>

```

## Updates

- 2014-01-10 - Changes to accomodate npm.
- 2013-12-11 - Added `papply` to the `_part_` namespace.