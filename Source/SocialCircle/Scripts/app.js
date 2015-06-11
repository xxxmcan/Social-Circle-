
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'LocalStorageModule', 'angular-loading-bar']);

app.value('toastr', toastr).value('$', $);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when("/Ana", {
        controller: 'mainController',
        templateUrl: '/Home/Ana'
    });

    $routeProvider.when("/Giris", {
        controller: 'girisController',
        templateUrl: '/Home/Giris'
    });


    $routeProvider.otherwise({ redirectTo: "/Ana" });

});


app.factory('signalrService', function ($, $rootScope) {

    var proxy = null;

    var initialize = function () {
       
        connection = $.hubConnection();

        
        this.proxy = connection.createHubProxy('hubProxy');

        connection.logging = true;

        
        connection.start()
            .done(function () {
                console.log("hub bağlandı");
            })
            .fail(function (error) {
                console.log(error + "hub baglanamadı");
            });

        
        this.proxy.on('addMassage', function (from, message) {
            $rootScope.$emit("addMassage", from, message);
        });
    };

    var sendMessage = function (from, message) {
        
        this.proxy.invoke('sendMessage', from, message);
    };

    return {
        initialize: initialize,
        sendMessage: sendMessage
    };
});

app.run(['localStorageService', '$location', 'signalrService', function (localStorageService, $location, signalrService) {

    signalrService.initialize();

    var nickName = localStorageService.get('nickName');

    console.log('Local Storoge E Bakıldı : ' + nickName);

    if (!nickName) {
        $location.path('/Giris');
    }

}]);