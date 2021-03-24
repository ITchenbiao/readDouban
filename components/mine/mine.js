angular.module('MineComp', [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('mine', {
				url: '/mine',
				templateUrl: 'components/mine/mine.html',
				controller: 'MineCtrl',
				css: 'components/mine/mine.css'
			})
			.state('mine.library', {
				url: '/library',
				templateUrl: 'components/mine/mine.library.html',
				controller: 'MineLibraryCtrl',
				css: 'components/mine/mine.library.css'
			})
	})

.controller('MineCtrl', ['$scope', function($scope) {

	if(window.localStorage.getItem('columnsOrderKey')) {
		$scope.arr = [];
		$scope.aleryOrderKey = window.localStorage.getItem('columnsOrderKey').split('@');
		$scope.len = $scope.aleryOrderKey.length;

		$scope.aleryOrderKey.forEach(function(item) {
			$scope.arr.push(JSON.parse(item));
		})
		$scope.More = true;
	} else {
		$('.mine-guess-like').hide();
	}

	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 4;
		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}
	
}])

.controller('MineLibraryCtrl', ['$scope', function($scope) {

	//读取数据库中已订阅图书
	$scope.letterLimit = 5;

	if(window.localStorage.getItem('columnsOrderKey')) {
		$scope.arr = [];
		$scope.aleryOrderKey = window.localStorage.getItem('columnsOrderKey').split('@');
		$scope.len = $scope.aleryOrderKey.length;
		console.log($scope.len);
		$scope.aleryOrderKey.forEach(function(item) {
			$scope.arr.push(JSON.parse(item));
		})
		$scope.More = true;

	} else {
		$('.mine-library-con').hide();
	}

	//加载更多
	$scope.reloadMore = function() {

		$scope.letterLimit = $scope.letterLimit + 4;
		if($scope.letterLimit > $scope.len) {
			$scope.More = false;
		}
	}

	$scope.goEbook = function(targetId) {
		window.localStorage.setItem('ebookNeedKey', targetId);
	}

}])