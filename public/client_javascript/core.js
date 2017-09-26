var theCollege = angular.module('theCollege', ['tableSort']);

theCollege.controller('mainController', function($scope, $http){
    $scope.formData = {};
    $scope.theColleges = {};

    $scope.createCollege= function() {
        $http.post('/sendCollegeInfo')
            .then(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.theColleges = data.data;
            })
            .catch(function (data) {
                console.log('Error: ' + data);
            });
    }

    
});