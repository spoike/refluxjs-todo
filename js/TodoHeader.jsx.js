(function(React, ReactRouter, Reflux, TodoActions, todoListStore, global) {    
    // Renders the headline and the form for creating new todos.
    // Used in TodoApp
    // Observe that the toogleall button is NOT rendered here, but in TodoMain (it is then moved up to the header with CSS)
    global.TodoHeader = React.createClass({
        handleValueChange: function(evt) {
            var text = evt.target.value;
            if (evt.which === 13 && text) { // hit enter, create new item if field isn't empty
                TodoActions.addItem(text);
                evt.target.value = '';
            } else if (evt.which === 27) { // hit escape, clear without creating
                evt.target.value = '';
            }
        },
        render: function() {
            return (
                <header id="header">
                    <h1>todos</h1>
                    <input id="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={this.handleValueChange}/>
                </header>
            );
        }
    });
})(window.React, window.ReactRouter, window.Reflux, window.TodoActions, window.todoListStore, window);
