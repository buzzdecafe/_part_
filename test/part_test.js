var _part_ = require( "../build/src/_part_" );

exports["_part_ has the correct interface"] = function ( test ) {

    test.expect( 8 );

    [
        "create_",
        "_create",
        "augment",
        "augment_",
        "_augment",
        "borrow",
        "borrow_",
        "_borrow"

    ].forEach(function methodTest( name ) {

            test.ok( typeof _part_[name] === "function", name + " should be a function" );

        });

    test.done();

};

exports["_create function binds receiver and partially applies arguments"] = function ( test ) {

    var a = "a", b = "b", c = "c", obj = {};

    function boltOn( prop, val ) {

        this[prop] = val;

        return this;

    }

    test.expect( 7 );

    test.ok( _part_._create( boltOn )( obj )() === obj );

    test.ok( _part_._create( boltOn )( obj )( a, 1 ) === obj );

    test.ok( _part_._create( boltOn )( obj, b )( 2 ) === obj );

    test.ok( _part_._create( boltOn )( obj, c, 3 )() === obj );

    test.ok( obj.a === 1 );

    test.ok( obj.b === 2 );

    test.ok( obj.c === 3 );

    test.done();

};

exports["create_ function partially applies arguments and binds receiver and additional arguments"] = function ( test ) {

    var arr = [];

    function insertSum( pos, a, b ) {

        this[pos] = a + b;

        return this;

    }

    test.expect( 7 );

    test.ok( _part_.create_( insertSum )()( arr ) === arr );

    test.ok( _part_.create_( insertSum )( 0 )( arr, 1, 2 ) === arr );

    test.ok( _part_.create_( insertSum )( 1, 3 )( arr, 4 ) === arr );

    test.ok( _part_.create_( insertSum )( 2, 5, 6 )( arr ) === arr );

    test.ok( arr[0] === 3 );

    test.ok( arr[1] === 7 );

    test.ok( arr[2] === 11 );

    test.done();

};