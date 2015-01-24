(function(React, RR, Reflux, app) {

	// Renders a single Todo item in the list
	// Used in TodoList
	
    var TodoItem = React.createClass({
        propTypes: {
            label: React.PropTypes.string.isRequired,
            isComplete: React.PropTypes.bool.isRequired,
            itemKey: React.PropTypes.number            
        },
        mixins: [React.addons.LinkedStateMixin], // exposes this.linkState used in render
        getInitialState: function() {
            return {};
        },
        handleToggle: function(evt) {
            app.todoActions.toggleItem(this.props.itemKey);
        },
        handleEditStart: function(evt) {
            evt.preventDefault();
            // because of linkState call in render, field will get value from this.state.editValue
            this.setState({
                isEditing: true,
                editValue: this.props.label
            }, function() {
                this.refs.editInput.getDOMNode().focus();
            });
        },
        handleValueChange: function(evt) {
            var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
            // we pressed enter, if text isn't empty we blur the field which will cause a save
            if (evt.which === 13 && text) {
                this.refs.editInput.getDOMNode().blur();
            }
            // pressed escape. set editing to false before blurring so we won't save
            else if (evt.which === 27) {
                this.setState({ isEditing: false },function(){
                    this.refs.editInput.getDOMNode().blur();
                });
            }
        },
        handleBlur: function() {
            var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
            // unless we're not editing (escape was pressed) or text is empty, save!
            if (this.state.isEditing && text) {
                app.todoActions.editItem(this.props.itemKey, text);
            }
            // whatever the outcome, if we left the field we're not editing anymore
            this.setState({isEditing:false});
        },
        handleDestroy: function() {
            app.todoActions.removeItem(this.props.itemKey);
        },
        render: function() {
            var classes = React.addons.classSet({
                'completed': this.props.isComplete,
                'editing': this.state.isEditing
            });
            return (
                <li className={classes}>
                    <div className="view">
                        <input className="toggle" type="checkbox" checked={!!this.props.isComplete} onChange={this.handleToggle} />
                        <label onDoubleClick={this.handleEditStart}>{this.props.label}</label>
                        <button className="destroy" onClick={this.handleDestroy}></button>
                    </div>
                    <input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handleValueChange} onBlur={this.handleBlur} />
                </li>
            );
        }
    });

    // Renders the todo list as well as the toggle all button
    // Used in TodoApp
    var TodoMain = React.createClass({
        mixins: [ RR.State ],
        propTypes: {
            list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
        toggleAll: function(evt) {
            app.todoActions.toggleAllItems(evt.target.checked);
        },
        render: function() {
            var filteredList;
            switch(this.getParams().show){
                case 'all':
                    filteredList = this.props.list;
                    break;
                case 'completed':
                    filteredList = _.filter(this.props.list,function(item){ return item.isComplete; });
                    break;
                case 'active':
                    filteredList = _.filter(this.props.list,function(item){ return !item.isComplete; });
            }
            var classes = React.addons.classSet({
                "hidden": this.props.list.length < 1
            });
            return (
                <section id="main" className={classes}>
                    <input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">
                        { filteredList.map(function(item){return <TodoItem label={item.label} isComplete={item.isComplete} key={item.key} itemKey={item.key}/>; }) }
                    </ul>
                </section>
            );
        }
    });

    // Renders the headline and the form for creating new todos.
    // Used in TodoApp
    // Observe that the toogleall button is NOT rendered here, but in TodoMain (it is then moved up to the header with CSS)
    var TodoHeader = React.createClass({
        handleValueChange: function(evt) {
            var text = evt.target.value;
            if (evt.which === 13 && text) { // hit enter, create new item if field isn't empty
                app.todoActions.addItem(text);
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

    // Renders the bottom item count, navigation bar and clearallcompleted button
    // Used in TodoApp
    var TodoFooter = React.createClass({
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
                            <RR.Link activeClassName="selected" to="todo" params={{show : 'all'}}>All</RR.Link>
                        </li>
                        <li>
                            <RR.Link activeClassName="selected" to="todo" params={{show : 'active'}}>Active</RR.Link>
                        </li>
                        <li>
                            <RR.Link activeClassName="selected" to="todo" params={{show : 'completed'}}>Completed</RR.Link>
                        </li>
                    </ul>
                    <button id="clear-completed" className={clearButtonClass} onClick={app.todoActions.clearCompleted}>{completedLabel}</button>
                </footer>
            );
        }
    });

    // Renders the full application
    // activeRouteHandler will always be TodoMain, but with different 'showing' prop (all/completed/active)
    var TodoApp = React.createClass({
        // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
        mixins: [Reflux.connect(app.todoListStore,"list")],
        getInitialState: function() {
            return {
                list: []
            };
        },
        render: function() {
            return (
                <div>
                    <TodoHeader />
                    <RR.RouteHandler list={this.state.list}/>
                    <TodoFooter list={this.state.list} />
                </div>
            );
        }
    });

    var routes = (
        <RR.Route handler={TodoApp} >
            <RR.Route name="todo" path="/:show" handler={TodoMain} />
        </RR.Route>
    );

    RR.run(routes, function (Handler) {
      React.render(<Handler />, document.getElementById('todoapp'));
    });


})(window.React, window.ReactRouter, window.Reflux, window.todoApp);
