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
        }).otherwise({
            redirectTo:'/'
        });
    });

angular.module('shopApp').controller('HomeCtrl',function(){

});



angular.module('shopApp').controller('LoginCtrl',function(){

});