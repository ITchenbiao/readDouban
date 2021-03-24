angular.module('GiftComp',[])

	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('gift',{
				url:'/gift',
				templateUrl:'components/gift/gift.html',
				controller:'GiftCtrl',
				css:'components/gift/gift.css'
			})
	})
	
	.controller('GiftCtrl',['$scope','$state',function($scope, $state){
		
		var value = window.localStorage.getItem('ebookNeedKey');
			
		$scope.wrap_visible = false;
		$scope.modefy_visible = false;
		$scope.before_visible = true;
		$scope.content=null;
		$scope.counts = null;
		
		//初始化
		$scope.initGift = function(){
			
			$scope.value = window.localStorage.getItem('bookBuyKey');
			$scope.objValue = JSON.parse($scope.value );
			
			//标题|作者|id
			$scope.author =$scope.objValue.author;
			$scope.title = $scope.objValue.title;
			$scope.price = $scope.objValue.price;
			if( isNaN($scope.objValue.price)){
				$scope.price = 0;
			}
			
			$scope.id = $scope.objValue.id;
			$scope.img = $scope.objValue.img;
			
		}
		
		//显示信息	
		$scope.viewMessage = function(){
			
			$scope.wrap_visible = !$scope.wrap_visible;
			
		}
		
		//文字写完
		$scope.writeOver = function(){
			
			$scope.content = $scope.ailer;
			$scope.wrap_visible = !$scope.wrap_visible;
			$scope.before_visible  = !$scope.before_visible ;
			$scope.modefy_visible  = !$scope.modefy_visible ;
			
		}
		
		//click：修改留言
		$scope.modefyMessage = function(){
			
			$scope.wrap_visible = !$scope.wrap_visible;
			$scope.content = $scope.ailer;
			$scope.before_visible  = !$scope.before_visible ;
			$scope.modefy_visible  = !$scope.modefy_visible ;
			
		}
		
		//click:生成礼物跳转
		$scope.createGift = function(){
			
			$scope.counts = $scope.count;
			$scope.endPrice =parseInt($scope.price) * parseInt($scope.counts);
			
			if(!$scope.ailer){
				alert('请先写下您的赠言');
			}else if(!$scope.counts){
				alert('请选择礼包内书的数量');
			}else{
				$scope.newNums= '"num":'+$scope.counts+'';
				window.localStorage.setItem('bookBuyKey', $scope.value.replace(/\"num\":1/,$scope.newNums));
				$state.go('purchase');
			}
			
		}
		
	}])
	
	