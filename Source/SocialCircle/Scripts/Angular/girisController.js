'use strict';
app.controller('girisController', ['$scope', 'toastr', '$location', 'localStorageService', function ($scope, toastr, $location, localStorageService) {

    $scope.giris = function () {

        var nickNameVal = $scope.txtNick;

        localStorageService.set('nickName', nickNameVal);

        console.log('Nick Name Alındı...');

        if (nickNameVal) {
            $location.path('/Ana');
        }
        
    }

}]);