'use strict';
app.controller('mainController', ['$scope', 'toastr', '$location', 'localStorageService', 'signalrService', function ($scope, toastr, $location, localStorageService, signalrService) {

    $scope.nickName = localStorageService.get('nickName');

    toastr.warning($scope.nickName + " : geldi");

    function displayMessage(from,message) {
        toastr.success(from + " : " + message); 
    }

    $scope.sendMessage = function () {
        var inputval = $scope.txtMsg;
        $scope.txtMsg = "";
        signalrService.sendMessage($scope.nickName, inputval);
    };

    $scope.$parent.$on("addMassage", function (e,from, message) {
        $scope.$apply(function () {
            displayMessage(from, message)
        });
    });
    

}]);