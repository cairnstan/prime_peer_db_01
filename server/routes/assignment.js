var express = require('express');
var Assignment = require('../../models/assignment_model');
var router = express.Router();



router.post('/new', function(request, response){
  //response.send('Assignments');
  var assignment = new Assignment(request.body);
  assignment.save(function(err){
    if (err){
      console.log(err);
    } else {
      console.log('Assignment saved:', assignment);
    }
  });
});

router.get('/:id', function(request, response){
  console.log('GET Request received');
  if (request.params.id){
    Assignment.findOne({_id: request.params.id}, function(err, assignment){
      if (err){
        console.log('Assignment id error', err);
      } else {
        response.send(assignment);
      }
    });
  }
});

router.get('/', function(request, response){
  // response.send('assignments now working');
  Assignment.find({}, function(err, assignments){
    if (err){
      console.log(err);
    } else {
      // console.log('Assignment got', assignments);
      response.send(assignments);
    }
  });
});

router.delete('/delete/:id', function(request, response){
  console.log('Delete object', request.params.id);
  Assignment.findOneAndRemove({_id: request.params.id}, function(err){
    if (err){
      console.log('delete error', err);
    }
  });
  response.sendStatus(200);
});

router.put('/edit', function(request, response){
  Assignment.findOneAndUpdate({_id: response.body._id});
});

module.exports = router;
