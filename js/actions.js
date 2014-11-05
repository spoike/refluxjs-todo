(function(Reflux, window) {
    'use strict';

    var Todo = Reflux.createActions([
        "toggleItem",
        "toggleAll",
        "addItem",
        "removeItem",
        "clearCompleted",
        "editItem"
    ]);

    window.Todo = Todo;

})(window.Reflux, window);
