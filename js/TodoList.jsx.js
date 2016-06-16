/** @jsx React.DOM */

(function(React, ReactRouter, TodoItem, TodoActions, global) {

    // Renders the todo list as well as the toggle all button
    // Used in TodoApp
    global.TodoList = React.createClass({
        mixins: [ ReactRouter.State ],
        propTypes: {
            list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
        toggleAll: function(evt) {
            TodoActions.toggleAllItems(evt.target.checked);
        },
        render: function() {
            var filteredList;
            switch(this.getPath()){
                case '/completed':
                    filteredList = _.filter(this.props.list,function(item){ return item.isComplete; });
                    break;
                case '/active':
                    filteredList = _.filter(this.props.list,function(item){ return !item.isComplete; });
                    break;
                default:
                    filteredList = this.props.list;
            }
            var classes = React.addons.classSet({
                "hidden": this.props.list.length < 1
            });
            return (
                <section id="main" className={classes}>
                    <input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">
                        { filteredList.map(function(item){
                            return <TodoItem label={item.label} isComplete={item.isComplete} id={item.key} key={item.key}/>;
                        })}
                    </ul>
                </section>
            );
        }
    });

})(window.React, window.ReactRouter, window.TodoItem, window.TodoActions, window);
