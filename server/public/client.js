var app = angular.module('peerApp', []);

app.controller('AssignmentController', function($scope, $http, $interval){
  $scope.assignment = {};
  $scope.assignments = [];



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

  $scope.getAssignments();

  $interval($scope.getAssignments, 5000);
});
