/**
 * Created by Administrator on 2016/10/22.
 */
angular.module('HomeListComp', [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('homelistnew', {
				url: '/homelistnew',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'HomeListNewCtrl',
				css: 'components/homeList/homeList.css'
			})
			.state('homelisthot', {
				url: '/homelisthot',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'HomeListHotCtrl',
				css: 'components/homeList/homeList.css'
			})
			.state('homelistpic', {
				url: '/homelistpic',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'HomeListPicCtrl',
				css: 'components/homeList/homeList.css'
			})
			.state('homelistfree', {
				url: '/homelistfree',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'HomeListFreeCtrl',
				css: 'components/homeList/homeList.css'
			})
			
			.state('columnlisthot', {
				url: '/columnlisthot',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'ColListHotCtrl',
				css: 'components/homeList/homeList.css'
			})
			.state('columnlistupdata', {
				url: '/columnlistupdata',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'ColListUpdataCtrl',
				css: 'components/homeList/homeList.css'
			})
			.state('serlisthot', {
				url: '/serlisthot',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'SerListHotCtrl',
				css: 'components/homeList/homeList.css'
			})
			.state('serlistupdata', {
				url: '/serlistupdata',
				templateUrl: 'components/homeList/homeList.html',
				controller: 'SerListUpdataCtrl',
				css: 'components/homeList/homeList.css'
			})
	})

.filter('addHomeListStyle', function() {

	return function(element) {
		var num = [];
		element.split(' ').forEach(function(item) {
			if(parseInt(item) || parseInt(item) == 0) {
				num.push(item);
			}
		});
		if(num.length >= 1) {
			num.unshift('￥');
		}
		return num.join('');
	}

})

.controller('HomeListNewCtrl', ['$scope','HomeService','$state', function($scope,HomeService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	HomeService.getNewData().success(function(data) {

		$scope.homelistData = data.books;
		$scope.len = data.books.length;;

	});

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}

	$scope.goEbook = function(Id){
		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}

}])

.controller('HomeListHotCtrl', ['$scope', 'HomeService','$state', function($scope, HomeService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	HomeService.getHotData().success(function(data) {

		$scope.homelistData = data.books;
		$scope.len = data.books.length;

	})

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}

	$scope.goEbook = function(Id){
		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}

}])

.controller('HomeListPicCtrl', ['$scope', 'HomeService', '$state',function($scope, HomeService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	HomeService.getPicData().success(function(data) {
		$scope.homelistData = data.books;
		$scope.len = data.books.length;
	})

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}

	$scope.goEbook = function(Id){
		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}
}])

.controller('HomeListFreeCtrl', ['$scope', 'HomeService','$state', function($scope, HomeService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	HomeService.getFreeData().success(function(data) {

		$scope.homelistData = data.books;
		$scope.len = data.books.length;

	})

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}
	$scope.goEbook = function(Id){

		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}

}])

.controller('ColListHotCtrl', ['$scope', 'columnService', '$state',function($scope, columnService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	columnService.getHotData().success(function(data) {

		$scope.homelistData = data.books;
		$scope.len = data.books.length;

	})

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}
	$scope.goEbook = function(Id){

		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}

}])

.controller('ColListUpdataCtrl', ['$scope', 'columnService','$state', function($scope, columnService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	columnService.getUpdataData().success(function(data) {

		$scope.homelistData = data.books;
		$scope.len = data.books.length;

	})

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}
	$scope.goEbook = function(Id){

		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}

}])

.controller('SerListHotCtrl', ['$scope', 'columnService','$state', function($scope, columnService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	columnService.getSerHotData().success(function(data) {

		$scope.homelistData = data.books;
		$scope.len = data.books.length;

	})

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}
	$scope.goEbook = function(Id){

		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}

}])

.controller('SerListUpdataCtrl', ['$scope', 'columnService','$state', function($scope, columnService,$state) {

	$scope.letterLimit = 10;
	$scope.More = true;

	columnService.getSerUpdataData().success(function(data) {

		$scope.homelistData = data.books;
		$scope.len = data.books.length;

	})

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 5;

		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}
	$scope.goEbook = function(Id){

		window.localStorage.setItem('ebookNeedKey',Id);
		$state.go('ebook');
	}

}]) 