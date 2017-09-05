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
        console.log("Load tasks");

        var self = this;
        $.get("/tasks", function (data) {
            console.log(data);

            self.setState(prevState => ({
                tasks: data.map(task =>
                    React.createElement(TaskItem, { key: task._id, data: task })
                )
            }));
        });
    }

    render() {
        return React.createElement("ul", null, this.state.tasks);
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

        $.ajax({
            url: "/tasks/" + this.state._id,
            method: "PUT",
            data: this.state
        });
    }

    render() {
        return React.createElement(
            "li",
            null,
            React.createElement("label", null, this.state.name),
            React.createElement("input", {
                type: "checkbox",
                onChange: this.toggleStatus,
                checked: this.state.status ? "checked" : ""
            })
        );
    }
}

ReactDOM.render(
    React.createElement(Tasks, null),
    document.getElementById("root")
);
