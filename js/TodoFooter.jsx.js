(function(React, ReactRouter, TodoActions, global) {
    // Renders the bottom item count, navigation bar and clearallcompleted button
    // Used in TodoApp
    global.TodoFooter = React.createClass({
        propTypes: {
            list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
        render: function() {
            var nbrcompleted = _.filter(this.props.list, "isComplete").length,
                nbrtotal = this.props.list.length,
                nbrincomplete = nbrtotal-nbrcompleted,
                clearButtonClass = React.addons.classSet({hidden: nbrcompleted < 1}),
                footerClass = React.addons.classSet({hidden: !nbrtotal }),
                completedLabel = "Clear completed (" + nbrcompleted + ")",
                itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
            return (
                <footer id="footer" className={footerClass}>
                    <span id="todo-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
                    <ul id="filters">
                        <li>
                            <ReactRouter.Link activeClassName="selected" to="All">All</ReactRouter.Link>
                        </li>
                        <li>
                            <ReactRouter.Link activeClassName="selected" to="Active">Active</ReactRouter.Link>
                        </li>
                        <li>
                            <ReactRouter.Link activeClassName="selected" to="Completed">Completed</ReactRouter.Link>
                        </li>
                    </ul>
                    <button id="clear-completed" className={clearButtonClass} onClick={TodoActions.clearCompleted}>{completedLabel}</button>
                </footer>
            );
        }
    });
})(window.React, window.ReactRouter, window.TodoActions, window);