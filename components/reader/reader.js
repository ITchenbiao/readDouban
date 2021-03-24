angular.module('ReaderComp', [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('reader', {
				url: '/reader',
				templateUrl: 'components/reader/reader.html',
				controller: 'ReadCtrl',
				css: 'components/reader/reader.css'
			})
			.state('reader.column', {
				url: '/library',
				templateUrl: 'components/reader/reader.column.html',
				controller: 'ReadColumnCtrl',
				css: 'components/reader/reader.css',
			})
			.state('reader.column.id', {
				url: '/id',
				templateUrl: 'components/reader/reader.column.id.html',
				controller: 'ReadEbookIdCtrl',
				css: 'components/reader/reader.column.id.css',
			})
			.state('reader.ebook', {
				url: '/ebook',
				templateUrl: 'components/reader/reader.ebook.html',
				controller: 'ReadEbookCtrl',
				css: 'components/reader/reader.css',
			})
			.state('reader.ebook.id', {
				url: '/id',
				templateUrl: 'components/reader/reader.ebook.id.html',
				controller: 'ReadEbookIdCtrl',
				css: 'components/reader/reader.ebook.id.css',
			})

	})

.filter('addOne', function() {
	return function(element) {
		return element + "";
	}
})

.controller('ReadCtrl', ['$scope', function($scope) {
	
	$scope.closeOver = function() {
		
		angular.element(document.querySelector('.over_film')).css('display', 'none');
		
	}
	
}])

.controller('ReadColumnCtrl', ['$scope', function($scope) {
	
}])

.controller('ReadEbookCtrl', ['$scope', function($scope) {
	
	
	if(window.localStorage.getItem('columnsOrderKey')) {
		$scope.arr = [];
		$scope.aleryOrderKey = window.localStorage.getItem('columnsOrderKey').split('@');
		
		$scope.aleryOrderKey.forEach(function(item) {
			$scope.arr.push(JSON.parse(item));
		})
	}
	
	$scope.goEbook = function(targetId) {
		window.localStorage.setItem('ebookNeedKey', targetId);
	}

	
}])

.controller('ReadEbookIdCtrl', ['$scope', function($scope) {

	$scope.readerEbookInit = function() {
		
		$scope.value = window.localStorage.getItem('bookBuyKey');
		$scope.ebookId = JSON.parse($scope.value).id;

		$.getJSON('https://api.douban.com/v2/book/' + $scope.ebookId + '?callback=?', function(data) {

			$scope.$apply(function() {
				$scope.arr = data.catalog.split('\n');
				$scope.title = data.title;
				$scope.publisher = data.publisher;
				$scope.author = data.author[0];
			})
		});

		$scope.viewCtrl = false;
		$scope.arkiconList = false;
		$scope.viewText = false;
	};

	$scope.viewArkicon = function() {
		
		$scope.arkiconList = !$scope.arkiconList;
		
	};
	$scope.viewMoreStyle = function() {
		
		angular.element(document.querySelector('.changeTextStyle')).css('display', 'block');
		angular.element(document.querySelector('.reader-ctrl')).css('display', 'none');
		
	};
	$scope.smallText = function() {
		angular.element(document.querySelector('.title')).css('fontSize', '0.6rem');
	};
	$scope.bigText = function() {
		angular.element(document.querySelector('.title')).css('fontSize', '1.2rem');
	};
	$scope.changeFontStyle = function() {
		angular.element(document.querySelector('.title')).css('fontFamily', 'Georgia');
	};
	$scope.day_text = function() {
		angular.element(document.querySelector('.reader-ebook-id-main')).css('background', '#ffffff');
	};

	$scope.normol_text = function() {
		angular.element(document.querySelector('.reader-ebook-id-main')).css('background', '#f6f4ec');
	};
	$scope.night_text = function() {
		angular.element(document.querySelector('.reader-ebook-id-main')).css('background', '#494b4a');
		angular.element(document.querySelector('.title')).css('color', '#ffffff');
		angular.element(document.querySelector('.title')).css('color', '#ffffff');
	};
	$scope.changeBackColor = function(n) {

		var color = document.getElementsByClassName('text_center')[0].getElementsByTagName('span')[n].style.background;
		
		angular.element(document.querySelector('.reader-ebook-id-main')).css('background', color);
	};
	$scope.contrlScreenView = function($event) {
		angular.element(document.querySelector('.changeTextStyle')).css('display', 'none');
		$scope.viewText = false;
		if($event.clientX / 32 > 0 && $event.clientX / 32 < 4) {
			console.log('上一页');
			$scope.viewCtrl = false;
		}

		if($event.clientX / 32 > 4 && $event.clientX / 32 < 6) {
			console.log('显示');
			$scope.viewCtrl = !$scope.viewCtrl;
			angular.element(document.querySelector('.reader-ctrl')).css('display', 'block');
		}

		if($event.clientX / 32 > 6 && $event.clientX / 32 < 10) {
			console.log('下一页');
			$scope.viewCtrl = false;

		}
	}

}]);