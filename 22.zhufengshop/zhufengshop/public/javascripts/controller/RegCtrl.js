angular.module('shopApp').controller('RegCtrl',function($scope,$http,$location){
    $scope.user = {};
    $scope.save = function(){
        console.log('savesavesave');
        $http({
            url:'/users/reg',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $location.path('/login');
        }).error(function(){
            $location.path('/reg');
        });
    }
});