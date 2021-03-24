angular.module('EbookComp', [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('ebook', {
				url: '/ebook',
				templateUrl: 'components/ebook/ebook.html',
				controller: 'EbookCtrl',
				css: 'components/ebook/ebook.css'
			})

	})

.controller('EbookCtrl', ['$scope', function($scope) {

	$scope.getData = function() {

		var num = window.localStorage.getItem('ebookNeedKey');

		$.getJSON('https://api.douban.com/v2/book/' + num + '?callback=?', function(data) {

			$scope.$apply(function() {
				$scope.items = data;
				$scope.price = data.price;
				var num = [];
				$scope.price.split(' ').forEach(function(item) {

					if(parseInt(item) || parseInt(item) == '0') {
						num.push(item);

					}
				});
				
				data.price = num.join('');
				if(num.length >= 1) {
					num.unshift('￥');
				}
				$scope.price = num.join('');

				if($scope.price == '') {
					$scope.price = '免費';
					$('.items_price').html('免费');
					$('.ebook_send').css({
						'display': 'none'
					})
					$('.ebook_buy').css({
						'margin-left': '1.5rem'
					})
					$('.buy_text').html('领取');
				}

				var str = data.catalog;
				str = str.replace(/\n/g, '<br>')

				$('#cataLi').html(str);
			})

		})

	}

	$scope.getData();

	$scope.buy = function(items_image, items_price, items_author, items_title, items_id) {

		if(items_price == '') {
			items_price = 0.00;
		}

		var data = {
			img: items_image,
			price: items_price,
			author: items_author,
			title: items_title,
			id: items_id,
			num: 1
		}
		window.localStorage.setItem('bookBuyKey', JSON.stringify(data))

	}

	$scope.show = function() {

		if($('#cataLi').attr('class') == 'LI1') {
			$('#cataLi').attr('class', 'LI2')
		} else {
			$('#cataLi').attr('class', 'LI1')
		}
	}

	$scope.share_class = function() {

		$('.overlay_page1').show();

		$('.ebook_cont').addClass('animated fadeInUp');
		$('.share_ul li').addClass('animated bounceIn');

	}

	$scope.cancel = function() {
		$('.overlay_page1').hide();
	}
}])