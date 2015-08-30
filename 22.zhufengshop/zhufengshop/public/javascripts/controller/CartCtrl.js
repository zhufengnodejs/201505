angular.module('shopApp').controller('CartCtrl',function($rootScope,$scope,dataService,$location){
  $scope.carts = [];
  dataService.get('/cart/list',function(carts){
      $scope.carts = carts;
      $scope.calculate();
  });
    $scope.calculate = function(){
        var sum = 0;
        $('input[name="chkItem"]:checked').each(function(){
            var self = $(this);
            var price = self.attr('data-price');
            var quantity = parseInt(self.parent().parent().find('input:eq(1)').val());
            sum += price * quantity;
        })
        $('#total').html(sum);
    }
});

angular.module('shopApp').directive('changeQuantity', function (dataService,$timeout) {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                var _id = attrs.id;
                var input = $(this).siblings('input');
                var newQuantity = parseInt(input.val())+parseInt(attrs['changeQuantity']);
                if(newQuantity>0){
                    dataService.post('/cart/changeQuantity',{_id:_id,quantity:newQuantity},function(){
                        input.val(newQuantity);
                        $timeout(function(){
                            scope.calculate();
                        },250);
                    });
                }
            });
        }
    }
})


angular.module('shopApp').directive('selectCartItem', function (dataService) {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                scope.calculate();
            });
        }
    }
})