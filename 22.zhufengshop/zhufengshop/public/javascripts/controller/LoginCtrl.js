angular.module('shopApp').controller('LoginCtrl',function($rootScope,$scope,$http,$location){
    $scope.user = {};
    $scope.login = function(){
        $http({
            url:'/users/login',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $rootScope.me = user;
            $location.path('/home');
        }).error(function(){
            $location.path('/login');
        });
    }
});