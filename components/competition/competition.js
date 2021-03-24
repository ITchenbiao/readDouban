angular.module('CompetitionComp', [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('competition', {
				url: '/competition',
				templateUrl: 'components/competition/competition.html',
				controller: 'indexCtrl',
				css: 'components/competition/competition.css'
			})
			.state('competition.index', {
				url: '/index',
				templateUrl: 'components/competition/comp.index.html',
				controller: 'indexCtrl',
				css: 'components/competition/competition.css',
			})
			.state('competition.career', {
				url: '/career',
				templateUrl: 'components/competition/comp.career.html',
				controller: 'careerCtrl',
				css: 'components/competition/competition.css',
			})
			.state('competition.comedy', {
				url: '/comedy',
				templateUrl: 'components/competition/comp.comedy.html',
				controller: 'comedyCtrl',
				css: 'components/competition/competition.css',
			})
			.state('competition.science', {
				url: '/science',
				templateUrl: 'components/competition/comp.science.html',
				controller: 'scienceCtrl',
				css: 'components/competition/competition.css',
			})

	})
.factory('CompFactory',[function(){
	
	var factory = {};
	factory.writeStorage = function(){
		
	}
	return factory;
	
}])

.service('CompService', ['$http', function($http) {

	this.getDataIndex = function() {
		return $http.get('./data/comp_index.json');
	}

	this.getData = function() {
		return $http.get('./data/competition.json');
	}

	this.getData_comedy = function() {
		return $http.get('./data/comedy.json');
	}

	this.getData_science = function() {
		return $http.get('./data/science.json');
	}

}])

.controller('indexCtrl', ['$scope', 'CompService', 'CompFactory',function($scope, CompService,CompFactory) {

	CompService.getDataIndex().success(function(res) {
		$scope.itemIndex = res.books;
	})

	CompService.getData().success(function(res) {
		$scope.itemCareer = res.books;
	})

	CompService.getData_comedy().success(function(res) {
		$scope.itemComedy = res.books;
	})

	CompService.getData_science().success(function(res) {
		$scope.itemScience = res.books;
	})

//	CompFactory.writeStorage
	
	$scope.putStorage = function(Storage) {
		$scope.id = Storage;
		localStorage.setItem('ebookNeedKey', $scope.id)
	}

	$scope.trunColor = function(e) {
		var ul = document.getElementsByClassName('comp_nav')[0];
		$(ul).find("li").css({
			'background': '#c05a32',
			'color': '#fff'
		})
		e.target.style.background = '#fff';
		e.target.style.color = '#c05a32';
	}

}])

.controller('careerCtrl', ['$scope', 'CompService', function($scope, CompService) {

	CompService.getData().success(function(res) {
		$scope.items = res.books;
	})

	$scope.putStorage = function(Storage) {

		localStorage.setItem('ebookNeedKey', Storage)
	}

}])

.controller('comedyCtrl', ['$scope', 'CompService', function($scope, CompService) {

	CompService.getData_comedy().success(function(res) {
		$scope.items = res.books;
	})

	$scope.putStorage = function(Storage) {

		localStorage.setItem('ebookNeedKey', Storage)
	}

}])

.controller('scienceCtrl', ['$scope', 'CompService', function($scope, CompService) {

	CompService.getData_science().success(function(res) {
		$scope.items = res.books;
	})

	$scope.putStorage = function(Storage) {

		localStorage.setItem('ebookNeedKey', Storage)
	}

}])