angular.module('shopApp').factory('dataService',function($http){
    var dataService={};
    var methods = ['get','post'];
    methods.forEach(function(method){
        dataService[method] = function(url){
            var options = {
                url:url,
                method:method.toUpperCase()
            }
            var second = arguments[1];
            var succFunc = null;
            if(typeof second == 'function'){
                succFunc = second;
            }else{
                options['data'] = second;
            }
            var http = $http(options);
            if(!succFunc){
                succFunc = arguments[2];
            }
            if(succFunc && typeof succFunc == 'function'){
                http.success(succFunc);
            }
        }
    });
    return dataService;
});