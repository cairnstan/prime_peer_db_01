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
  } else {
    Assignment.find({}, function(err, assignments){
      if (err){
        console.log(err);
      } else {
        // console.log('Assignment got', assignments);
        response.send(assignments);
      }
    });
  }
});

module.exports = router;
