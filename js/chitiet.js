var app = angular.module('AppDuLich', []);
app.controller("ChitietCtrl", function ($scope, $http) {
    $scope.tourdetail;  
    $scope.LoadTourchitietID = function () { 
		var key = 'matour';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length-1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api-nguoidung/TourDetail/get-by-iddetail/'+value,
        }).then(function (response) { 
            $scope.tourdetail = response.data;
            var machitiettour = response.data.machitiettour
            localStorage.setItem('machitiettour', machitiettour);
        });
    };  
    $scope.tour
    $scope.LoadTourchitietID()
    $scope.LoadTourID = function () { 
		var key = 'matour';
        var value = window.location.search.substring(window.location.search.indexOf(key)+key.length-1);	 
        console.log(value)
        $http({
            method: 'GET', 
            url: current_url + '/api/Tour/get-by-id/'+value,
        }).then(function (response) { 
            $scope.tour = response.data;	
           
        });
    };  
    $scope.LoadTourID()
    $scope.lichtrinh=[]; 
    $scope.LoadLichtrinh = function () { 
        var machitiettour = localStorage.getItem('machitiettour');
        $http({
            method: 'GET', 
            url: current_url + '/api-nguoidung/Lichtrinh/get-by-id-lichtrinh/'+ machitiettour,
        }).then(function (response) { 
            $scope.lichtrinh = response.data;	
        });
    };  
    $scope.LoadLichtrinh()

});
app.filter('dateFormat', function ($filter) {
    return function (input) {
       if (input) {
       var date = new Date(input);
         return $filter('date')(date, 'dd/MM/yyyy');
      }
       return '';
     };
  });
