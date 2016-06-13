(function(React, ReactRouter, Reflux, TodoHeader, TodoFooter, todoListStore, global) {
    // Renders the full application
    // RouteHandler will always be TodoList, but with different 'showing' prop (all/completed/active)
    global.TodoApp = React.createClass({
        // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
        mixins: [Reflux.connect(todoListStore,"list")],

        render: function() {
            return (
                <div>
                    <TodoHeader />
                    <ReactRouter.RouteHandler list={this.state.list} />
                    <TodoFooter list={this.state.list} />
                </div>
            );
        }
    });

})(window.React, window.ReactRouter, window.Reflux,window.TodoHeader, window.TodoFooter, window.todoListStore, window);