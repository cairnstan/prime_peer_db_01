var app = angular.module('peerApp', []);

app.controller('AssignmentController', function($scope, $http, $interval, $filter){

  $scope.dateConversion = function(dateString){

    var tempDateString = dateString.substring(0,10);
    console.log('dateString', dateString);
    // var tempDate = new Date(dateString);
    var tempDate = moment().format(tempDateString, "YYYY-MM-DD");
    console.log('tempDate', tempDate);
    console.log(typeof tempDate);
    return tempDate;
  };

  // $scope.dateConversion = function(dateString){
  //   var tempDate = JSON.parse(dateString);
  //   return tempDate;
  // }

  $scope.assignment = {};
  $scope.assignments = [];

  $scope.selected = {};
  $scope.newAssignment = {};

  var promise;



  $scope.submitAssignment = function(){
    $http.post('/assignments/new', $scope.assignment).then(function(response){
      console.log('Assignment posted');
      $scope.getAssignments();
    });
  };

  $scope.getAssignments = function(){
    console.log('getAssignments ran');
    $http.get('/assignments').then(function(response){
      console.log('client.js response', response);
      $scope.assignments = response.data;
      // $scope.assignments = JSON.parse($scope.assignments);
      // console.log('getAssignments dateCompleted value type', typeof $scope.assignments[0].dateCompleted)
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

    $http.put('assignments/edit', $scope.newAssignment.entry).then(function(response){
      console.log('Assignment edited?', response);
      $scope.getAssignments();
      $scope.startInterval();
    });
  };

  $scope.showEditFields = function(assignment){
    if(assignment.showEditForm){
      assignment.showEditForm = false;
    } else {
      assignment.showEditForm = true;
    }
  };

  $scope.getAssignments();

  promise = $interval($scope.getAssignments, 5000);

  $scope.stopInterval = function(){
    $scope.showEditForm = true;
    $interval.cancel(promise);
  }

  $scope.startInterval = function(){
    //$scope.stopInterval();
    promise = $interval($scope.getAssignments, 5000);
  }
});
