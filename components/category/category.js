/**
 * Created by Administrator on 2016/10/22.
 */

angular.module('CategoryComp', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('category', {
			url: '/category',
			controller: 'ColumnslistCtrl',
			templateUrl: 'components/category/category.html',
			css: 'components/category/category.css'
		})

})

.controller('ColumnslistCtrl', ['$scope', '$state','$timeout', function($scope, $state,$timeout) {

	//init
	$scope.loadText = function() {

		$scope.letterLimit = 10;
		$scope.More = true;
		$scope.newvalue = window.sessionStorage.getItem('upData');
		
		//跨域请求分类
		$.ajax({
			url: "https://api.douban.com/v2/book/search",
			data: 'q=' + $scope.newvalue + '',
			dataType: 'jsonp',
			success: function(data) {

				$scope.$apply(function() {

					$scope.book = data.books;
					$scope.total = data.total;
					$scope.len = data.books.length;

				});

				//读取数据库中已订阅图书
				if(window.localStorage.getItem('columnsOrderKey')) {

					$scope.aleryOrderKey = window.localStorage.getItem('columnsOrderKey').split('@');
					$scope.aleryOrderKey.forEach(function(item) {
						var id = JSON.parse(item).id;
						$('#' + id).find('.wrap-hide').hide().siblings('.already-sub').show();
					})

				}
			},

			error: function(err) {
				console.log('error');
			}
		})

	}

	$scope.mySub = false;
	$scope.Tohide = false;
	$scope.Toshow = false;
	$scope.Sucsub = false;
	$scope.Cursub = true;
	$scope.SuccessSubFlag = false;
	$scope.that = null;

	//订阅设置
	$scope.goEbook = function($event, targetId, subImg, Titlesub, subAuthor) {

		$scope.obj = {
			id: targetId,
			img: subImg,
			tit: Titlesub,
			auth: subAuthor
		};

		if($event.target.className == 'btn-wrapper') {

			$scope.mySub = !$scope.mySub;
			$scope.Tohide = true;
			$scope.Toshow = false;
			$scope.Sucsub = false;
			$scope.Cursub = true;
			$scope.titlesub = Titlesub;

		} else {

			window.localStorage.setItem('ebookNeedKey', targetId);
			$state.go('ebook');
			
		}
		$scope.that = $event;
	}

	//关闭按钮
	$scope.isClose = function() {
		$scope.mySub = !$scope.mySub;
		$scope.SuccessSubFlag = false;
	}

	//点击确定订阅
	$scope.SuccessSub = function() {

		var value = window.localStorage.getItem('columnsOrderKey');

		if(value) {
			window.localStorage.setItem('columnsOrderKey', value + '@' + JSON.stringify($scope.obj));
		} else {
			window.localStorage.setItem('columnsOrderKey', JSON.stringify($scope.obj));
		}


		$scope.Tohide = false;
		$scope.Toshow = true;
		$scope.SuccessSubFlag = true;

		$timeout(function(){

			$scope.mySub = false;

		},1000);

		$scope.judegeSubFlag($scope.that);
	}

	//更改订阅与已经订阅切换
	$scope.judegeSubFlag = function($event) {

		if($scope.SuccessSubFlag) {
			$($event.target).closest('.wrap-hide').hide();
			$($event.target).closest('.action').find('.already-sub').show();
		}

	}

	//加载更多
	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;
		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}

	}

}])