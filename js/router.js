(function(React, ReactRouter, TodoApp,TodoList, global) {
	var routes = (
	    <ReactRouter.Route handler={TodoApp}>
	        <ReactRouter.Route name="All" path="/" handler={TodoList} />
	        <ReactRouter.Route name="Completed" path="/completed" handler={TodoList} />
	        <ReactRouter.Route name="Active" path="/active" handler={TodoList} />
	    </ReactRouter.Route>
	);
	ReactRouter.run(routes, function(Handler) {
	    React.render(<Handler/>, document.getElementById('todoapp'));
	});
})(window.React, window.ReactRouter,window.TodoApp, window.TodoList, window);