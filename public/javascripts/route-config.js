var app = angular.module('MyYoutubeList');

app.config(['$routeProvider', ConfigAngularRouter]);

function ConfigAngularRouter($routeProvider, authProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/home.html',
        })
        .when('/Login', {
            templateUrl: '/templates/Login.html',
            controller: 'loginController',
        })
        .when('/Logout', {
            template: '<br><h1>Logout...</h1>',
            controller: 'logoutController',
        })
        .when('/Register', {
            templateUrl: '/templates/Register.html',
            controller: 'registerController',
        })
        .when('/Playlist', {
            resolve: {
                authenticate: function (User) {
                    return User.authenticate();
                }
            },
            templateUrl: '/templates/Playlist.html',
            controller: 'playlistController',
        })
        .otherwise({
            redirectTo: '/'
        });
};