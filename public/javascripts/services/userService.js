var app = angular.module('MyYoutubeList');
app.factory('User', ['$http', '$q', 'CheckIfLoggedIn', UserFactory]);
app.factory('UserLogin', ['$http', UserLogin]);
app.factory('UserLogout', ['$http', UserLogout]);
app.factory('CheckIfLoggedIn', ['$location', '$http', CheckIfLoggedIn]);
app.run(function($rootScope, $location){
    //If the route change failed due to authentication error, redirect them out
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        if(rejection === false){
            $location.path('/');
        }
    })
});

function UserFactory($http, $q, CheckIfLoggedIn) {
    return {
        register: function (user) {
            return $http.post('/register', user);
        },
        authenticate: function () {
            return $q(function (resolve, reject) {
                CheckIfLoggedIn.CheckIfLogin()
                    .then(function (result) {
                        return result ? resolve(result) : reject(result);
                    });
            })
        }
    };
};

function UserLogin($http) {
    return {
        login: function (user) {
            return $http.post('/loginServer', user)
        }
    };
};



function CheckIfLoggedIn($location, $http) {
    return {
        CheckIfLogin: function () {
            return $http.get('/api/CheckIfLogin').then(function (res) {
                return res.data;
            });
        }
    };
};


function UserLogout($http) {
    return {
        logout: function () {
            return $http.get('/logout');
        }
    };
};