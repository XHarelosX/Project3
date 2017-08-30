var app = angular.module('MyYoutubeList');

app.config(function ($sceProvider) {
    $sceProvider.enabled(false);
});
app.controller('playlistController', ['$rootScope','$scope', '$log', '$http', '$location', 'AddVideo', 'CheckIfLoggedIn', 'GetVideosData', 'EditVideo', playlistController]);

function playlistController($rootScope,$scope, $log, $http, $location, AddVideo, CheckIfLoggedIn, GetVideosData, EditVideo) {
    $scope.videos = {};
    GetVideosData.then(function (res) {
        $rootScope.userData = "you are in! :)"
        $scope.model.userVideos = res;
        $scope.model.nowPlaying = $scope.model.userVideos[0];
        
        console.log(res);
    });

    $scope.model = {
        userVideos: [],
        selectedVideo: {},
        nowPlaying: {},
    };

    $scope.newVideo = {};
    $scope.newVideoPerams = function (newVideo) {
        $scope.newVideo.youtubeEmbedUrl = "https://www.youtube.com/embed/" + $scope.newVideo.youtubeId;
        $scope.newVideo.youtubeImageUrl = "https://img.youtube.com/vi/" + $scope.newVideo.youtubeId + "/default.jpg";
        $scope.newVideo.ID = Math.floor(new Date().getTime());

    };

    $scope.youtubeIdREGEX = "^[a-zA-Z0-9_]*$"
    $scope.categories = ["POP", "ROCK", "HIPHOP", "JAZZ"];

    $scope.editThisVideo = function (video) {
        $scope.model.selectedVideo = angular.copy(video);
    };

    $scope.updateVideo = function () {
        $scope.editedVideo = $scope.model.selectedVideo;
        console.log($scope.editedVideo)
        EditVideo.UpdateVideo($scope.editedVideo).then(function (res) {
            video = $scope.editedVideo;
            $('#editModal').modal('hide');
            $scope.editVideoForm.$setUntouched();
            $scope.editVideoForm.$setPristine();
            $scope.model.selectedVideo = {};
            GetVideosData.then(function (res) {
                $scope.model.userVideos = res;
                $scope.model.nowPlaying = $scope.model.userVideos[0];
            })
        })
    }

    $scope.whatchThisVideo = function (video) {
        $scope.model.nowPlaying = video;
    };

    $scope.playVideo = function (video) {
        $scope.model.nowPlaying = angular.copy(video);
    };

    $scope.addVideoToPlaylist = function () {
        $scope.newVideoPerams($scope.newVideo);
        console.log($scope.newVideo);
        AddVideo.AddNewVideo($scope.newVideo).then(function (response) {
            $scope.model.userVideos.push($scope.newVideo);
            $('#addModal').modal('hide');
            $scope.addVideoForm.$setUntouched();
            $scope.addVideoForm.$setPristine();
            $scope.newVideo = {};
            console.log($scope.model.userVideos);
            console.log('received from the server', response);
            $location.path('/Playlist');
        }, function (response) {
            alert('Video validation failed')
        });
    }

    $scope.deleteVideo = function (e) {
        var areYouSure = confirm("Are you sure?")
        if (areYouSure == true) {
            console.log("jhgdf");
            e.parent.target.remove()
        };
    };
};