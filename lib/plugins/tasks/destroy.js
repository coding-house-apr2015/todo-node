'use strict';

var Task = require('../../models/task');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/tasks/{taskId}',
    config: {
      description: 'Delete a task',
      validate: {
        params: {
          taskId: Joi.string().length(24)
        }
      },
      handler: function(request, reply){
        Task.findOne({_id: request.params.taskId, userId: request.auth.credentials._id}, function(err, task){
          if(!task){return reply().code(400);}

          task.remove(function(){
            return reply(task);
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'tasks.destroy'
};
