var app = angular.module('MyYoutubeList');
app.factory('AddVideo', ['$http', AddNewVideo]);

function AddNewVideo($http) {
    return {
        AddNewVideo: function (user) {
            return $http.post('/addNewVideo', user)
        }
    };
}

app.factory('GetVideosData', ['$http', function ($http) {
    return $http.get('/getVideos').then(function (res) {
        return res.data;
    })
}]);


app.factory('EditVideo', ['$http', EditVideo]);
 function EditVideo($http) {
    return {
        UpdateVideo: function (video) {
            return $http.post('/updateVideo', video).then(function(){
                console.log('doing good brother!');
            })
        }
    };
}