angular.module('shopApp').controller('GoodsCtrl',function($rootScope,$scope,$http,$location){
    $scope.goods = [];
    $http({
        url:'/goods/list',
        method:'GET'
    }).success(function(goods){
        $scope.goods = goods;
    }).error(function(){

    });

    $scope.save = function(){
      $http({
          url:'/goods/add',
          method:'POST',
          data:$scope.good
      }).success(function(good){
          if(!$scope.good._id)
            $scope.goods.push(good);
          else{
              $scope.goods.forEach(function(good){
                  if(good._id = $scope.good._id){
                      good = $scope.good;
                  }
              });
          }
      }).error(function(){

      });
  }

    $scope.delete = function(){
        $http({
            url:'/goods/delete',
            method:'POST',
            data:$scope.good
        }).success(function(good){
            $scope.goods = $scope.goods.filter(function(good){
                return good._id != $scope.good._id;
            });
        }).error(function(){

        });
    }
});

angular.module('shopApp').directive('addGoods',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.good = {};
                });
                $('#addDialog').modal(true);
            });
        }
    }
})

angular.module('shopApp').directive('viewGoods',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#viewDialog').modal(true);
            });
        }
    }
})


angular.module('shopApp').directive('editGoods',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#addDialog').modal(true);
            });
        }
    }
})

angular.module('shopApp').directive('deleteGoods',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#deleteDialog').modal(true);
            });
        }
    }
})