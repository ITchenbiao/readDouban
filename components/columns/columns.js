/**
 * Created by Administrator on 2016/10/22.
 */
angular.module('ColumnsComp', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('columns', {
			url: '/columns',
			templateUrl: 'components/columns/columns.html',
			controller: 'ColumnsCtrl',
			css: 'components/columns/columns.css'
		})
		.state('serial', {
			url: '/serial',
			templateUrl: 'components/columns/columns.html',
			controller: 'serialCtrl',
			css: 'components/columns/columns.css'
		})

})

.factory('swipterFactory', function() {
	var factory = {};
	factory.swipter = function() {
		var swiper = new Swiper('.swiper-container', {
			autoplay: 3000,
			autoplayDisableOnInteraction: false,
			loop: 'true',
			pagination: '.swiper-pagination'

		});
	}
	
	return factory;
	
})

.service('columnService', ['$http', function($http) {

	this.getHotData = function() {
		return $http.get('data/columns.hot.json');
	}

	this.getUpdataData = function() {
		return $http.get('data/columns.update.json');
	}

	this.getSerHotData = function() {
		return $http.get('data/serial.hot.json');
	}

	this.getSerUpdataData = function() {
		return $http.get('data/serial.update.json');
	}

}])

.controller('ColumnsCtrl', ['$scope', 'columnService', 'swipterFactory', '$state', function($scope, columnService, swipterFactory, $state) {

	$scope.head = "豆瓣专栏";
	$scope.subTit = "世间之事，经验之谈。";
	$scope.cateHead = "专栏分类";

	//底部专栏分类
	$scope.category = ['文化', '情感', '短故事', '旅行', '行业', '饮食',
		'亲子', '风尚', '科技', '心理', '理财', '娱乐',
		'设计', '科普', '健康', '游戏', '其他'
	];

	columnService.getHotData().success(function(data) {
		
		$scope.hotData = data.books;
	})

	columnService.getUpdataData().success(function(data) {
		$scope.updateData = data.books;
	})

	//点击
	$scope.getDataText = function(targetId) {

		window.localStorage.setItem('ebookNeedKey', targetId);

	}

	$scope.getLiText = function($event) {

		window.sessionStorage.setItem('upData', $event.target.innerHTML);

	}
	$scope.goList = function() {
		$state.go("columnlisthot");
	}

	$scope.goList2 = function() {
		$state.go("columnlistupdata");
	}

	//轮播
	swipterFactory.swipter();

}])


.controller('serialCtrl', ['$scope', 'columnService', 'swipterFactory', '$state', function($scope, columnService, swipterFactory, $state) {

	$scope.head = "豆瓣连载";
	$scope.subTit = "追就对了。";
	$scope.cateHead = "连载分类";

	//底部专栏分类
	$scope.category = ['当代小说', '青春小说', '言情小说', '玄幻奇幻', '悬疑推理', '武侠小说',
		'科幻小说', '纪实文学', '灵异小说', '历史随笔', '穿越小说', '职场小说', '其他'
	];

	columnService.getSerHotData().success(function(data) {
		$scope.hotData = data.books;
	})

	columnService.getSerUpdataData().success(function(data) {
		$scope.updateData = data.books;
	})

	//点击
	$scope.getDataText = function(targetId) {

		window.localStorage.setItem('ebookNeedKey', targetId);

	}

	$scope.getLiText = function($event) {

		window.sessionStorage.setItem('upData', $event.target.innerHTML);

	}

	$scope.goList = function() {
		$state.go("serlisthot");
	}

	$scope.goList2 = function() {
		$state.go("serlistupdata");
	}

	//轮播
	swipterFactory.swipter();

}])