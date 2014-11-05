var AppTodos = {};

(function(Reflux, app) {
    'use strict';

    app.todoActions = Reflux.createActions([
        "toggleItem",
        "toggleAll",
        "addItem",
        "removeItem",
        "clearCompleted",
        "editItem"
    ]);

})(Reflux, AppTodos);
