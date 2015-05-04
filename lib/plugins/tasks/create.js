'use strict';

var Task = require('../../models/task');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/tasks',
    config: {
      description: 'Create a task',
      validate: {
        payload: {
          title: Joi.string().required().min(3),
          due: Joi.date().iso().required()
        }
      },
      handler: function(request, reply){
        var task = new Task(request.payload);
        task.userId = request.auth.credentials._id;
        task.save(function(){
          return reply(task);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'tasks.create'
};
