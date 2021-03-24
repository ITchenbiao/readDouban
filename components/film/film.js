
angular.module('filmComp',[])
    .config(function ($stateProvider,$urlRouterProvider){
    	
        $stateProvider
            .state('film',{
                url:'/film',
                templateUrl:'components/film/film.html',
                controller:'filmCtrl',
                css:'components/film/film.css'
            })
            .state('film_sale',{
                url:'/film_sale',
                templateUrl:'components/film/film_sale.html',
                css:'components/film/film_sale.css',
                controller:'filmsaleCtrl'
            })
            .state('film_list',{
                url:'/film_list',
                templateUrl:'components/film/film_list.html',
                css:'components/film/film_list.css',
                controller:'filmlistCtrl'
            })
            
    })
    
    .service('filmService',['$http',function ($http) {
    	
        this.getData=function () {
            return $http.get("./data/film.json");
        }
        this.getsaleData=function () {
            return $http.get("./data/sale.json");
        }
        
    }])
    
    .controller('filmCtrl',['$scope','filmService',function ($scope,filmService) {
    	
        filmService.getData().success(function (res) {
            $scope.data = res.books;
        });
        
        $scope.set_id = function(Id) {
        	
            window.localStorage.setItem('listKey', Id);
        }
        $scope.login = function() {
        	
            document.querySelector('.over_film').style.display='flex';

        }
        $scope.closeLogin = function() {
        	
            document.querySelector('.over_film').style.display='none';

        }
        
    }])
    
    .controller('filmsaleCtrl',['$scope','filmService',function ($scope,filmService) {
    	
        filmService.getsaleData().success(function (res) {
        	
            $scope.data = res.books;
            
        })
        
        $scope.set_id = function(Id) {
        	
            window.localStorage.setItem('listKey', Id);
        }
        
    }])
    
    .controller('filmlistCtrl',['$scope',function ($scope) {
    	
        var id = window.localStorage.getItem('listKey');
        
        var url = "https://api.douban.com/v2/book/"+id;
        
        $.getJSON(url+"?callback=?",function (data) {
            $scope.$apply(function(){
                $scope.books = data;
            })
        });
        
        $scope.goEbook = function(){
        	
        	window.localStorage.setItem('ebookNeedKey',id);
			        	
        }
        
        
    }])
