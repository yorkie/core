module('base');

test('basic test', function() {
    var foo = {
        bar: {
            value: "I'm foo.bar.value",
        }
    };
    var foobar = foo;
    foobar.value = foo.bar.value;
    equal( FIRE.getVarFrom(foo,'bar.value'), "I'm foo.bar.value", "The value must be same" );
    equal( FIRE.getVarFrom(foobar,'bar.value'), "I'm foo.bar.value", "The value must be same" );
    equal( FIRE.getVarFrom(foobar,'value'), "I'm foo.bar.value", "The value must be same" );
    equal( FIRE.getVarFrom(foobar,'hello.world'), null, "The value must be same" );

    //
    var TestEnum = (function (t) {
        t[t.Width   = 1] = 'Width';
        t[t.Name    = 20] = 'Name';
        t[t.UseBest = 0] = 'UseBest';
        t[t.Height  = 10] = 'Height';
        t[t.Area    = 15] = 'Area';
        return t;
    })({});

    deepEqual ( FIRE.getEnumList(TestEnum), 
               [
                   { name: "UseBest", value: 0 },
                   { name: "Width", value: 1 },
                   { name: "Height", value: 10 },
                   { name: "Area", value: 15 },
                   { name: "Name", value: 20 },
               ],
               "The value must be same" ); 
});

module('simpleExtend');

test('test', function () {
    var MyClass = FIRE.simpleExtend(FIRE.Texture, function (img, x, y) {
        this.x = x;
        this.y = y;
    }, 'My_Class');
    var img = {width: 125, height: 256};
    var obj = new MyClass(img, 2, 5);
    strictEqual(obj.y, 5);
    strictEqual(obj.image, img);
    strictEqual(obj.width, 125);
    strictEqual(FIRE.getClassName(obj), 'My_Class');
});
