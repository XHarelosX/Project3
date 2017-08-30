var app = angular.module('MyYoutubeList');

app.controller('loginController', ['UserLogin', '$scope', '$location', loginController]);

function loginController(UserLogin, $scope, $location) {
    $scope.login = {
        email: 'asaf@gmail.com',
        password: '12345678'
    };

    $scope.LoginServer = function () {
        UserLogin.login($scope.login)
            .then(
                function () {
                    $location.path('/Playlist');
                },
                function (err) {
                    alert('Bad Login Credentials')
                }
            );
    };
};