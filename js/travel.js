var app = angular.module('AppDuLich', []);

app.controller("HomeCtrl", function ($scope, $http,$window,$location) {
    $scope.listTourMoi=[];
    $scope.LoadTourMoi = function () {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/Tour/get-by-tour',
        }).then(function (response) {
            $scope.listTourMoi = response.data;
            console.log('GET:', response.data);
          
        });
    };
    $scope.LoadTourdesc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/Tour/get-by-tour-desc',
        }).then(function (response) {
            $scope.listTourMoi = response.data;
            console.log('GET:', response.data);
          
        });
    };
    $scope.LoadTourasc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/Tour/get-by-tour-asc',
        }).then(function (response) {
            $scope.listTourMoi = response.data;
            console.log('GET:', response.data);
          
        });
    };
    $scope.handleChange = function () {
        if ($scope.selectedOption === "1") {
            $scope.LoadTourdesc();
        }
        if ($scope.selectedOption === "0") {
            $scope.LoadTourasc();
        }
    };
    $scope.listTouruudai=[];
    $scope.LoadTourUuDai = function () {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/Tour/get-by-tour-uudai',
        }).then(function (response) {
            $scope.listTouruudai = response.data;
            console.log('Tour LoadTourUuDai successfully:', response.data);

        });
    };
    $scope.listuudai=[];
    $scope.UuDai = function () {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/Uudai/get-by-uudai',
        }).then(function (response) {
            // Gán dữ liệu cho biến listTourMoi hoặc một biến khác tùy vào cách bạn muốn hiển thị
            $scope.listuudai = response.data;
            console.log('Tour LoadTourUuDai successfully:', response.data);

        });
    };
    $scope.listdiadiem=[];
    $scope.Diadiem = function () {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/Diadiem/get-by-diadiem',
        }).then(function (response) {
            // Gán dữ liệu cho biến listTourMoi hoặc một biến khác tùy vào cách bạn muốn hiển thị
            $scope.listdiadiem = response.data;
        });
    };
    $scope.page_index = 1;
    $scope.page_size = 8;
    $scope.tieudetour = '';
    $scope.noikhoihanh= '';
   
    $scope.searchTours = function () {
        $http({
            method: 'POST',
            url: current_url + '/api-nguoidung/Tour/search',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'charset': 'utf-8'
            },
            data: {
                page: $scope.page_index,
                pageSize: $scope.page_size,
                tieudetour: $scope.tieudetour,
                noikhoihanh: $scope.noikhoihanh
            },
            
        }).then(function (response) {     
            $scope.listTourMoi = response.data;
            
            console.log('Tour added s:', $scope.listTourMoi);

        });
    };
 
    $scope.onPageSizeChange = function (noikhoihanh) {
        $scope.searchTours(); 
    };
    $scope.onChange = function (tieudetour) {
        $scope.searchTours(); 
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
 
    $scope.LoadNguoidungbyID()
    $scope.Diadiem();
    $scope.UuDai();
    $scope.LoadTourMoi();
    $scope.LoadTourUuDai();
});

function Laymataikhoan() {
    var mataikhoan = localStorage.getItem('mataikhoan');
    
    // Kiểm tra nếu mataikhoan có giá trị, sau đó chuyển hướng
    if (mataikhoan) {
        window.location.href = 'giohang.html?mataikhoan=' + mataikhoan;
    } else {
        console.error('Không có giá trị mataikhoan trong localStorage');
    }
}
 app.filter('dateFormat', function ($filter) {
    return function (input) {
       if (input) {
       var date = new Date(input);
         return $filter('date')(date, 'dd/MM/yyyy');
      }
       return '';
     };
  });


  