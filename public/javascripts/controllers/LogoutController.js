var app = angular.module('MyYoutubeList');

app.controller('logoutController', ['UserLogout','$rootScope', '$scope','$location', logoutController]);

function logoutController(UserLogout,$rootScope, $scope, $location) {
    UserLogout.logout().then(function(){
        $rootScope.userData = null;
        $rootScope.model = {};
        $location.path('/')
    }

    )
    
};