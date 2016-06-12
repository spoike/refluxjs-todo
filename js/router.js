(function(React, ReactRouter, TodoApp,TodoMain, global) {
	var routes = (
	    <ReactRouter.Route handler={TodoApp}>
	        <ReactRouter.Route name="All" path="/" handler={TodoMain} />
	        <ReactRouter.Route name="Completed" path="/completed" handler={TodoMain} />
	        <ReactRouter.Route name="Active" path="/active" handler={TodoMain} />
	    </ReactRouter.Route>
	);
	ReactRouter.run(routes, function(Handler) {
	    React.render(<Handler/>, document.getElementById('todoapp'));
	});
})(window.React, window.ReactRouter,window.TodoApp, window.TodoMain, window);