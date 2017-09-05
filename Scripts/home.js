'use strict';

/* Home */

$.get('http://localhost:3000/tasks', function (data) {
  console.log(data);
  var tasks = data.map(function (task) {
    return React.createElement(
      'li',
      { key: task._id },
      React.createElement(
        'label',
        null,
        task.name
      ),
      React.createElement('input', { type: 'checkbox' })
    );
  });
  ReactDOM.render(React.createElement(
    'ul',
    null,
    tasks
  ), document.getElementById('root'));
});