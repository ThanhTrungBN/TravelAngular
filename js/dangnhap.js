var app = angular.module('AppDuLich', []);

app.controller("HomeCtrl", function ($scope, $http, $window, $location) {

    $scope.submitLogin = function () {
        var credentials = {
            username: $scope.username,
            password: $scope.password
        };

        $http({
            method: 'POST',
            url: current_url + '/api-nguoidung/User/login',
            data: credentials,
        }).then(function (response) {
            if (response.data) {
                console.log('Đăng nhập thành công');
                var manguoidung = response.data.manguoidung;
                var mataikhoan = response.data.mataikhoan;
                var per = response.data.per;
                if (per == 'admin') {
                    localStorage.setItem('mataikhoan', mataikhoan);
                    $window.location.href = 'quantri.html?manguoidung=' + manguoidung;
                }
                if (per == 'user') {
                    localStorage.setItem('mataikhoan', mataikhoan);
                    $window.location.href = 'travel.html?manguoidung=' + manguoidung;
                }
            } else {
                console.log('Đăng nhập thất bại');
            }
        }, function (error) {
            // Xử lý lỗi khi đăng nhập
            console.error(error.data);
        });
    };
});