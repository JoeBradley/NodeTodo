/* Home */
class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: null
        };

        this.load();
    }

    load() {
        console.log('Load tasks');

        var self = this;
        $.get('/tasks', function (data) {
            console.log(data);

            self.setState(prevState => ({
                tasks: data
                    //.map((task) => <TaskItem key={task._id} data={task} /*onDelete={() => self.deleteTask(task._id)}*/ />)
            }));
        });
    }

    deleteTask(id) {
        $.ajax({ url: '/tasks/' + this.state._id, method: 'DELETE' }); 
        this.load();
    }

    render() {
        if (this.state.tasks === null) return  null;
        var cntrls = this.state.tasks.map((task) => <TaskItem key={task._id} data={task} onDelete={() => self.deleteTask(task._id)} />)
        return (
            <ul>{cntrls}</ul>
        );
    }
}

class TaskItem extends React.Component {
    constructor(props) {
        super(props);

        console.log("Task item: " + JSON.stringify(props));

        this.state = props.data;

        // This binding is necessary to make `this` work in the callback
        this.toggleStatus = this.toggleStatus.bind(this);

        this.deleteClick = this.deleteClick.bind(this);
    }

    toggleStatus() {
        this.setState(prevState => ({
            status: !prevState.status            
        }), this.save);
    }

    deleteClick() {
        console.log('Deleteing task: ' + this.state._id);
        this.delete();
        // TODO: update tasks list
    }

    save() {
        $.ajax({ url: '/tasks/' + this.state._id, method: 'PUT', data: this.state }); 
    }

    delete() {
        $.ajax({ url: '/tasks/' + this.state._id, method: 'DELETE', data: this.state }); 
    }

    render() {
        return (
            <li>
                <label>{this.state.name}</label>
                <input type="checkbox" onChange={this.toggleStatus} checked={this.state.status ? 'checked' : ''} />
                <button onClick={this.deleteClick}>Delete</button>
            </li>
        );
    }
}

ReactDOM.render(<Tasks/>, document.getElementById('root'));