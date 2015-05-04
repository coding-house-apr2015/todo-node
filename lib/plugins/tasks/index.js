'use strict';

var Task = require('../../models/task');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/tasks',
    config: {
      description: 'Get all tasks by User',
      handler: function(request, reply){
        Task.find({userId: request.auth.credentials._id}, function(err, tasks){
          return reply({tasks: tasks});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'tasks.index'
};
