/* Home Controller */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tasks = (function (_React$Component) {
    _inherits(Tasks, _React$Component);

    function Tasks(props) {
        _classCallCheck(this, Tasks);

        _get(Object.getPrototypeOf(Tasks.prototype), 'constructor', this).call(this, props);
        this.state = {
            tasks: null
        };

        this.load();
    }

    _createClass(Tasks, [{
        key: 'load',
        value: function load() {
            console.log('Load tasks');

            var self = this;
            $.get('/tasks', function (data) {
                console.log(data);

                self.setState(function (prevState) {
                    return {
                        tasks: data
                    };
                });
            });
        }
    }, {
        key: 'deleteTask',
        value: function deleteTask(id) {
            $.ajax({ url: '/tasks/' + this.state._id, method: 'DELETE' });
            this.load();
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.tasks === null) return null;
            var cntrls = this.state.tasks.map(function (task) {
                return React.createElement(TaskItem, { key: task._id, data: task, onDelete: function () {
                        return self.deleteTask(task._id);
                    } });
            });
            return React.createElement(
                'form',
                { 'class': 'form-horizontal' },
                cntrls
            );
        }
    }]);

    return Tasks;
})(React.Component);

var TaskItem = (function (_React$Component2) {
    _inherits(TaskItem, _React$Component2);

    function TaskItem(props) {
        _classCallCheck(this, TaskItem);

        _get(Object.getPrototypeOf(TaskItem.prototype), 'constructor', this).call(this, props);

        console.log("Task item: " + JSON.stringify(props));

        this.state = props.data;

        // This binding is necessary to make `this` work in the callback
        this.toggleStatus = this.toggleStatus.bind(this);

        this.deleteClick = this.deleteClick.bind(this);
    }

    _createClass(TaskItem, [{
        key: 'toggleStatus',
        value: function toggleStatus() {
            this.setState(function (prevState) {
                return {
                    status: !prevState.status
                };
            }, this.save);
        }
    }, {
        key: 'deleteClick',
        value: function deleteClick() {
            console.log('Deleteing task: ' + this.state._id);
            this['delete']();
            // TODO: update tasks list
        }
    }, {
        key: 'save',
        value: function save() {
            $.ajax({ url: '/tasks/' + this.state._id, method: 'PUT', data: this.state });
        }
    }, {
        key: 'delete',
        value: function _delete() {
            $.ajax({ url: '/tasks/' + this.state._id, method: 'DELETE', data: this.state });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'checkbox-inline' },
                React.createElement(
                    'label',
                    null,
                    this.state.name,
                    React.createElement('input', { type: 'checkbox', className: 'form-control', onChange: this.toggleStatus, checked: this.state.status ? 'checked' : '' })
                ),
                React.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: this.deleteClick },
                    'Delete'
                )
            );
        }
    }]);

    return TaskItem;
})(React.Component);

ReactDOM.render(React.createElement(Tasks, null), document.getElementById('root'));

//export default function loadTasks() {
//    ReactDOM.render(<Tasks />, document.getElementById('root'));
//}

