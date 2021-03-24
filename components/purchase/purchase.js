
angular.module('PurchComp',[])
    .config(function($stateProvider,$urlRouterProvider){

        $stateProvider
            .state('purchase',{
                url:'/purchase',
                templateUrl:'components/purchase/purchase.html',
                controller:'PurchCtrl',
                css:'components/purchase/purchase.css'
            })
    })
    
	.controller('PurchCtrl',['$scope',function($scope){
		
		$scope.initPurchase = function(){
			$scope.value = window.localStorage.getItem('bookBuyKey');
			$scope.endPrice = window.localStorage.getItem('gifPrice');

			$scope.objValue = JSON.parse($scope.value)
			$scope.title =$scope.objValue.title;
			$scope.id = $scope.objValue.id;
			$scope.price = parseFloat($scope.objValue.price) * parseInt($scope.objValue.num);
		}
		
	}])
	
	