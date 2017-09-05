/* TODO List Routes */

'use strict';
module.exports = function(app) {
  var express = require('express');
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
	
	/*
	app.get('/', function(req,res) {
	  res.sendfile('index.html');
	});
	app.get('/index.html', function(req,res) {
	  res.sendfile('index.html');
	});*/
};
