/* Home Controller */
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
            }));
        });
    }

    deleteTask(id) {
        $.ajax({ url: '/tasks/' + this.state._id, method: 'DELETE' });
        this.load();
    }

    render() {
        if (this.state.tasks === null) return null;
        const cntrls = this.state.tasks.map(task => <TaskItem key={task._id} data={task} onDelete={() => self.deleteTask(task._id)} />)
        return (
            <form class="form-horizontal">
                {cntrls}
            </form>
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
            <div class="checkbox-inline">
                <label>{this.state.name}
                    <input type="checkbox" className="form-control" onChange={this.toggleStatus} checked={this.state.status ? 'checked' : ''} />
                </label>
                <button className="btn btn-default" onClick={this.deleteClick}>Delete</button>
            </div>
        );
    }
}

ReactDOM.render(<Tasks />, document.getElementById('root'));

//export default function loadTasks() {
//    ReactDOM.render(<Tasks />, document.getElementById('root'));
//}