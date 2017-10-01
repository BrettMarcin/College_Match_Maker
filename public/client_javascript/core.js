var theCollege = angular.module('theCollege', ['tableSort']);

theCollege.controller('mainController', function($scope, $http){
    $scope.formData = {};
    $scope.theColleges = {};
    $scope.inputBoxes = new Set();
    $scope.firstCollege = {};
    $scope.secCollege = {};


    $scope.createCollege = function() {
        $http.post('/sendCollegeInfo')
            .then(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.theColleges = data.data;
            })
            .catch(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.addChecked = function(theModel, event) {
        if ($scope.inputBoxes.has(theModel)){
            $scope.inputBoxes.delete(theModel);
        } else if($scope.inputBoxes.size < 2) {
            $scope.inputBoxes.add(theModel);
        }
        if ($scope.inputBoxes.size === 2){
            var collegeArray = Array.from($scope.inputBoxes);
            $scope.firstCollege = collegeArray[0];
            $scope.secCollege = collegeArray[1];
        }
    };
    
    $scope.shouldDisable = function (theModel) {
        if ($scope.inputBoxes.size === 2){
            if($scope.inputBoxes.has(theModel)){
                return false;
            } else {
                return true;
            }
        }
    };

    $scope.getColor = function(firstNumber, secondNumber) {
        if (firstNumber > secondNumber){
            return '#7CFC00';
        } else if (firstNumber < secondNumber) {
            return 'red';
        } else {
            return 'white';
        }
    };
});