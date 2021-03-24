angular.module('SearComp', [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('search', {
				url: '/search',
				templateUrl: 'components/search/search.html',
				controller: 'SearCtrl',
				css: 'components/search/search.css'
			})

	})

.filter('searAddStyle', function() {
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

.service('SearService', ['$http', function($http) {

	this.getSuggessLiData = function() {
		return $http.get('./data/searchTitle.json');
	}
	
}])

.controller('SearCtrl', ['$scope', 'SearService', function($scope, SearService) {

	$scope.searNoItem = true;
	$scope.searItem = false;
	$scope.More = false;
	$scope.letterLimit = 8;
	//keyup:suggess事件
	$scope.suggestKeyUp = function($event) {

		var reg = /^\w$/;
		$scope.searNoItem = false;
		$scope.suggessUl = true;
		$scope.searItem = false;

		if(reg.test($event.key) == true) {
			SearService.getSuggessLiData().success(function(res) {

				$scope.bookTitle = res.books;
				
				if(res.count == 0) {
					console.log('找不到书!');
					$scope.searNoItem = true;
					$scope.suggessUl = false;
				}
			});
		} else {
			console.log('输入不符规范');
		}
		if(!$scope.searchText) {
			$scope.suggessUl = false;
		}
		
	}

	//click:list赋值给input
	$scope.getLiText = function(context) {
		
		$scope.searchText = context;
		$scope.suggessUl = false;
		
	}

	//click:跨域搜索
	$scope.searchBook = function() {

		$.ajax({
			url: "https://api.douban.com/v2/book/search",
			data: 'q=' + $scope.searchText + '',
			dataType: 'jsonp',
			success: function(data) {

				$scope.book = data.books;
				$scope.len = data.books.length;
				$scope.searNoItem = false;
				$scope.searItem = true;
				$scope.suggessUl = false;
				$scope.More = true;
				
				if(data.count == 0) {
					console.log('nosearchBook');
					$scope.searNoItem = true;
					$scope.searItem = false;
				}

			},

			error: function(err) {
				console.log('error');
			}

		});
		
	}

	//id存入数据库
	$scope.putStorage = function(targetId) {
		$scope.id = targetId;
		window.localStorage.setItem('ebookNeedKey', $scope.id);
	}

	$scope.reloadMore = function(){
		$scope.letterLimit+=4;
		if($scope.letterLimit>$scope.len){
			$scope.More = false;
		}
		
	}
	
}])