/* Home */

$.get('http://localhost:3000/tasks', function(data){
console.log(data);
var tasks = data.map((task) =>
  <li key={task._id}><label>{task.name}</label><input type="checkbox" onClick={this.statusOnClick} /></li>
);

statusOnClick() {
    console.log(this);
	
	this.setState(prevState => ({
      status: 'completed'
    }));
	$.ajax({url: 'http://localhost:3000/tasks/' + this._id, method: 'PUT', data: this});
  }


  $('input[type="checkbox"]').click())

  
ReactDOM.render(
  <ul>{tasks}</ul>,
  document.getElementById('root')
);
  
});
