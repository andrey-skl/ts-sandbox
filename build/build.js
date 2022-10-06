System.register("sandbox", [], function (exports_1, context_1) {
    "use strict";
    var shape;
    var __moduleName = context_1 && context_1.id;
    function pickByShape(type, schema) {
        return schema;
    }
    return {
        setters: [],
        execute: function () {
            shape = pickByShape({}, {
                nullable: { foo: null }
            });
        }
    };
});
