/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scripts_home_jsx__ = __webpack_require__(1);


Object(__WEBPACK_IMPORTED_MODULE_0__Scripts_home_jsx__["a" /* default */])();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadTasks;
/* Home Controller */
class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: null,
            xhr: null
        };
    }

    componentDidMount() {
        this.load();
    }

    componentWillUnmount() {
        if (this.xhr !== null) {
            this.xhr.abort();
            this.xhr = null;
        }
    }

    load() {
        console.log('Load tasks');

        var self = this;
        this.xhr = $.get('/tasks', function (data) {
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
        const cntrls = this.state.tasks.map(task => React.createElement(TaskItem, { key: task._id, data: task, onDelete: () => self.deleteTask(task._id) }));
        return React.createElement(
            'ul',
            null,
            cntrls
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
        return React.createElement(
            'li',
            null,
            React.createElement(
                'label',
                null,
                this.state.name
            ),
            React.createElement('input', { type: 'checkbox', onChange: this.toggleStatus, checked: this.state.status ? 'checked' : '' }),
            React.createElement(
                'button',
                { onClick: this.deleteClick },
                'Delete'
            )
        );
    }
}

function loadTasks() {
    ReactDOM.render(React.createElement(Tasks, null), document.getElementById('root'));
}

/***/ })
/******/ ]);