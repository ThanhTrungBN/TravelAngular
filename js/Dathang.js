var app = angular.module('AppDulich', []);
app.controller("ChitietCtrl", function ($scope, $http) {
    
    $scope.tour 
    $scope.LoadTourID = function () { 
		var key = 'matour';
        var value = window.location.search.substring(window.location.search.indexOf(key)+key.length-1);	 
        console.log(value)
        $http({
            method: 'GET', 
            url: current_url + '/api-nguoidung/Tour/get-by-id/'+value,
        }).then(function (response) { 
            $scope.tour = response.data;	
            $scope.price ={
                adult: { quantity: 1, price: response.data.gia },
                children: { quantity: 0, price: response.data.giatreem }, 
                smallchildren :{quantity:0, price:response.data.giatrenho},
                baby:{quantity:0,price:response.data.giaembe},
            };	
            angular.forEach($scope.price, function (value, category) {
                $scope.updateTotalPrice(category);
            });
        });
    
    };  
    $scope.updateQuantity = function (category, delta) {
        if ($scope.price[category].quantity + delta >= 0) {
            $scope.price[category].quantity += delta;
        }
        $scope.updateTotalPrice(category);
    };

    // Hàm cập nhật tổng giá
    $scope.updateTotalPrice = function (category) {
        $scope.price[category].total = $scope.price[category].quantity * $scope.price[category].price;
        console.log("Total price for " + category + ": " + $scope.price[category].total);
        $scope.calculateTotalPrice(); 
       
    };
    $scope.calculateTotalPrice = function () {
        $scope.totalSl =0;
        $scope.totalPrice = 0;
        angular.forEach($scope.price, function (value, category) {
            $scope.totalPrice += $scope.price[category].total;
        });
        angular.forEach($scope.price, function (value, category) {
            $scope.totalSl += $scope.price[category].quantity;
        });
        console.log("Total price for all : " + $scope.totalPrice);
        console.log("Total price for all : " + $scope.totalSl);

        $scope.order.totalSl = $scope.totalSl;
        $scope.order.totalPrice = $scope.totalPrice;
    };

    angular.forEach($scope.price, function (value, category) {
        $scope.updateTotalPrice(category);
    });

    $scope.listorder=[]

    $scope.Loadorder = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Order/get-by-order',
        }).then(function (response) {
            $scope.listorder = response.data;
        });
    };
    $scope.order = {};
    $scope.mataikhoan = localStorage.getItem('mataikhoan')
    $scope.addOrder = function (matour,hanhkhach,thanhtien,mataikhoan) {
        mataikhoan= parseInt($scope.mataikhoan);
        hanhkhach = $scope.order.totalSl;
        thanhtien = $scope.order.totalPrice;
        console.log('Data to be sent:', {
            matour: matour,
            thanhtien: thanhtien,
            hanhkhach: hanhkhach,
            mataikhoan: mataikhoan
        });
        $http({
            method: 'POST', 
            url: current_url + '/api-nguoidung/Order/create-order',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'charset': 'utf-8'
            },
            data: {
                matour:matour,
                thanhtien:  thanhtien,
                hanhkhach:hanhkhach,
                mataikhoan:mataikhoan
        }
        }).then(function (response) {
            $scope.listorder.push(response.data);
            $scope.order = {}; 
            console.log('Tour added successfully:', response.data);
        }, function (error) {
            console.error('API Error:', error.status, error.statusText, error.data);
        });
    };

    $scope.LoadTourID()
    $scope.Loadorder()
    
});



