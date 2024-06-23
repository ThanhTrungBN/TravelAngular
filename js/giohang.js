var app = angular.module('AppDuLich', []);
app.controller("HomeCtrl", function ($scope, $http){

    $scope.listorder=[]
    $scope.Loadorder = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Order/get-by-order',
        }).then(function (response) {
            $scope.listorder = response.data;
        });
    };
    $scope.Loadorder()


    $scope.listorderid=[]
    $scope.Loadorderid = function () {
        var mataikhoan = localStorage.getItem('mataikhoan');
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/Order/get-by-orderid/'+ mataikhoan,
        }).then(function (response) {
            $scope.listorderid = response.data;
        });
    };
    $scope.Loadorderid()
    $scope.nguoidung;  
    $scope.LoadNguoidungbyID = function () { 
        var manguoidung = localStorage.getItem('manguoidung');
        $http({
            method: 'GET', 
            url: current_url + '/api-nguoidung/Nguoidung/get-user-id/'+manguoidung,
        }).then(function (response) { 
            $scope.nguoidung = response.data;
        });
    }; 
    $scope.LoadNguoidungbyID()

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
