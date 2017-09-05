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
                tasks: data.map((task) => <TaskItem key={task._id} data={task} />)
            }));
        });
    }

    render() {
        return (
            <ul>{this.state.tasks}</ul>
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
    }

    toggleStatus() {
        this.setState(prevState => ({
            status: !prevState.status            
        }));

        $.ajax({ url: '/tasks/' + this.state._id, method: 'PUT', data: this.state });        
    }

    render() {
        return (
            <li>
                <label>{this.state.name}</label>
                <input type="checkbox" onChange={this.toggleStatus} checked={this.state.status ? 'checked' : ''} />
            </li>
        );
    }
}

ReactDOM.render(<Tasks/>, document.getElementById('root'));