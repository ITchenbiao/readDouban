angular.module('myApp', ['ui.router', 'angularCSS',
	'HomeComp', 'SearComp', 'PurchComp',
	'GiftComp', 'MineComp', 'ReaderComp', 'EbookComp',
	'CompetitionComp', 'filmComp', 'clipComp',
	'HomeListComp', 'CategoryComp', 'ColumnsComp', 'me-lazyload'
])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
})

.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if(attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}
})