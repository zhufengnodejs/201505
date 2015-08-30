angular.module('shopApp').controller('NavBarCtrl',function($rootScope,$scope,$http,$location){
    $scope.logout = function(){
        $http({
            url:'/users/logout',
            method:'POST'
        }).success(function(user){
            $rootScope.me = null;
            $location.path('/login');
        }).error(function(){
            $location.path('/login');
        });
    }
    $scope.isActive = function(path){
        return path == $location.path();
    }
});