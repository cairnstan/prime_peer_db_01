var app = angular.module('peerApp', []);

app.controller('AssignmentController', function($scope, $http, $interval){
  $scope.assignment = {};
  $scope.assignments = [];

  $scope.selected = {};
  $scope.newAssignment = {};



  $scope.submitAssignment = function(){
    $http.post('/assignments/new', $scope.assignment).then(function(response){
      console.log('Assignment posted');
      $scope.getAssignments();
    });
  };

  $scope.getAssignments = function(){
    var assignmentList = $scope.assignments;
    console.log('getAssignments ran');
    $http.get('/assignments').then(function(response){
      console.log('client.js response', response);
      $scope.assignments = response.data;

    });
  };

  $scope.removeEntry = function(entry){
    var entryID = entry._id;
    $http.delete('/assignments/delete/' + entryID).then(function(response){
        console.log('Assignment deleted?');
        $scope.getAssignments();
    });
  };

  $scope.editAssignment = function(){

    $http.put('assignments/edit', $scope.newAssignment).then(function(response){
      console.log('Assignment edited?', response);
      $scope.getAssignments();
    });
  };

  $scope.getAssignments();

  $interval($scope.getAssignments, 5000);
});
