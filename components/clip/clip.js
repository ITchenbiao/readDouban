/**
 * Created by Administrator on 2016/10/22 0022.
 */
angular.module('clipComp', [])

	.config(function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('clip', {
				url: '/clip',
				templateUrl: 'components/clip/clip.html',
				css: 'components/clip/clip.css',
				controller: 'clipCtrl'
			})
			
	})
	
	.service('ClipService', ['$http', function($http) {

		this.getData = function() {
			return $http.get("./data/clip.json");
		}

	}])
	
	.controller('clipCtrl', ['$scope', 'ClipService', function($scope, ClipService) {
		
		ClipService.getData().success(function(res) {
			$scope.data = res.books;
		})

		$scope.setclipid = function(Id) {
			
			window.localStorage.setItem('ebookNeedKey', Id);
		}

		$scope.play_film = function() {
			
			var video = document.querySelector('video');
			video.style.display = 'block';
			video.play();
			video.style.width = "100%";
			video.style.height = "100%";
			document.querySelector('.clip_play').style.background = "none";
			
		}

	}])