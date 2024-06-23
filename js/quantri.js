var app = angular.module('AppDuLich', []);
app.controller("HomeCtrl", function ($scope, $http) {
    $scope.listTourMoi = [];
    $scope.newTour = {};

    $scope.LoadTourMoi = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Tour/get-by-tour',
        }).then(function (response) {
            $scope.listTourMoi = response.data;
        });
    };

    $scope.addTour = function () {
        $http({
            method: 'POST',
            url: current_url + '/api/Tour/create-tour',
            data: $scope.newTour
        }).then(function (response) {
            $scope.listTourMoi.push(response.data);
            $scope.newTour = {}; // Đặt lại giá trị của newTour
            console.log('Tour added successfully:', response.data);
        }, function (error) {
            console.error('Error adding tour:', error);
        });
    };
    $scope.xoatour = function (matour) {
        $http.delete(current_url + '/api/Tour/delete-tour/' + matour)
            .then(function (response) {
                // Xử lý phản hồi từ server sau khi xóa tour thành công
                console.log('Tour deleted successfully:', response.data);
                
                // Cập nhật danh sách sau khi xóa
                var index = $scope.listTourMoi.findIndex(tour => tour.matour === matour);
                if (index !== -1) {
                    $scope.listTourMoi.splice(index, 1);
                }

                $scope.newTour = {}; // Đặt lại giá trị của newTour
            })
            .catch(function (error) {
                console.error('Error deleting tour:', error);
            });
    }
    $scope.suaTour = function () {
        // Thực hiện gọi API sửa tour tại đây
        $http({
            method: 'POST',
            url: current_url + '/api/Tour/update-tour',
            data: $scope.newTour
        })
        .then(function (response) {
            console.log('Tour updated successfully:', response.data);
            // Cập nhật danh sách hoặc thực hiện các bước khác sau khi sửa tour thành công
        })
        .catch(function (error) {
            console.error('Error updating tour:', error);
        });
    };

    $scope.nguoidung;  
    $scope.LoadNguoidungbyID = function () { 
        var mataikhoan = localStorage.getItem('mataikhoan');
        console.log(mataikhoan)
		var key = 'manguoidung';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);	
        localStorage.setItem('manguoidung', value);	 
        $http({
            method: 'GET', 
            url: current_url + '/api/Nguoidung/get-user-id/'+value,
        }).then(function (response) { 
            $scope.nguoidung = response.data;
        });
    }; 
    $scope.soluongtour;
    $scope.Loadsoluongtour = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Thongke/get-soluong-tour',
        }).then(function (response) {
            $scope.soluongtour = response.data;
        });
    };
    $scope.soluongacc;
    $scope.Loadsoluongacc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Thongke/get-soluong-account',
        }).then(function (response) {
            $scope.soluongacc = response.data;
        });
    };
    $scope.soluongorder;
    $scope.Loadsoluongorder = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Thongke/get-soluong-order',
        }).then(function (response) {
            $scope.soluongorder = response.data;
        });
    };
    $scope.Loadsoluongorder();
    $scope.Loadsoluongacc();
    $scope.Loadsoluongtour();
    $scope.LoadNguoidungbyID();
    $scope.LoadTourMoi();
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
