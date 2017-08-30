var app = angular.module('MyYoutubeList', ['ngRoute']);

app.factory('User', ['$http', UserFactory]);

function UserFactory($http) {
    return {
        register: function (user) {
            return $http.post('/register', user);
        }
    };
}

app.factory('UserLogin', ['$http', UserLogin]);

function UserLogin($http) {
    return {
        login: function (user) {
            return $http.post('/loginServer', user)
        }
    };
}

app.factory('AddVideo', ['$http', AddNewVideo]);

function AddNewVideo($http) {
    return {
        AddNewVideo: function (user) {
            return $http.post('/addNewVideo', user)
        }
    };
}
app.factory('GetVideosData',['$http',function($http){
    return $http.get('/getVideos').then(function(res){
                return res.data;
})}]);


app.factory('CheckIfLoggedIn', ['$location', '$http', CheckIfLoggedIn])

function CheckIfLoggedIn($location, $http) {
    return {
        CheckIfLogin: function () {
            return $http.get('/api/CheckIfLogin').then(function (res) {
                console.log(res)
        if (res === true) {
            console.log(res)
        } else {
            console.log(res)
            $location.path('/');
        }
    });

        }
    }
}
// app.factory('authProvider', function() {
//     var user;
//       return {
//         setUser : function(aUser){
//           user = aUser;
//         },
//         isLoggedIn : function(){
//           return(user)? user : false;
//         }
//       };
//   });
