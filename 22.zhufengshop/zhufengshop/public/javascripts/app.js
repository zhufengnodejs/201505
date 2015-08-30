angular.module('shopApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider.when('/',{
            templateUrl:'pages/home.html',
            controller:'HomeCtrl'
        }).when('/reg',{
            templateUrl:'pages/reg.html',
            controller:'RegCtrl'
        }).when('/login',{
            templateUrl:'pages/login.html',
            controller:'LoginCtrl'
        }).when('/goods/back/list',{
            templateUrl:'pages/goods/back/list.html',
            controller:'GoodsCtrl'
        }).when('/goods/front/list',{
            templateUrl:'pages/goods/front/list.html',
            controller:'GoodsCtrl'
        }).when('/cart/list',{
            templateUrl:'pages/cart/list.html',
            controller:'CartCtrl'
        }).otherwise({
            redirectTo:'/'
        });
    }).run(function($rootScope,$location,$http){
        $http({
            url:'/users/validate',
            method:'POST'
        }).success(function(user){
            $rootScope.me = user;
            $location.path('/');
        }).error(function(data){
            $location.path('/login');
        });
    });

angular.module('shopApp').controller('HomeCtrl',function(){

});



angular.module('shopApp').controller('LoginCtrl',function(){

});