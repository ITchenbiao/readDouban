angular.module('HomeComp', [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'components/home/home.html',
				controller: 'HomeCtrl',
				css: 'components/home/home.css'
			})

	})

.filter('addHomeStyle', function() {
	return function(element) {
		var num = [];
		element.split(' ').forEach(function(item) {
			if(parseInt(item) || parseInt(item) == 0) {
				num.push(item);
			}
		});
		if(num.length >= 1) {
			num.unshift('￥');
			return num.join('');
		} else {
			return "免费"
		}
	}
})

.service('HomeService', ['$http', function($http) {

	this.getNewData = function() {
		return $http.get('./data/home.new.json');
	}

	this.getHotData = function() {
		return $http.get('./data/home.hot.json');
	}

	this.getPicData = function() {
		return $http.get('./data/home.pic.json');
	}

	this.getFreeData = function() {
		return $http.get('./data/home.free.json');
	}

}])

.controller('HomeCtrl', ['$scope', 'HomeService', function($scope, HomeService) {

	HomeService.getNewData().success(function(data) {

		$scope.newData = data.books;

	})

	HomeService.getHotData().success(function(data) {

		$scope.hotData = data.books;

	})

	HomeService.getPicData().success(function(data) {

		$scope.drawData = data.books;

	})

	HomeService.getFreeData().success(function(data) {

		$scope.freeData = data.books;

	})

	$scope.getDataText = function(targetId) {

		window.localStorage.setItem('ebookNeedKey', targetId);

	}

}])