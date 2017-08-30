var app = angular.module('MyYoutubeList');

app.controller('registerController',['User', '$scope', '$location', registerController]);

function registerController(User, $scope, $location) {

    $scope.user = {
        firstName: "assaf",
        lastName: "briga",
        email: "asaf@gmail.com",
        password: "12345678",
        confirm: "12345678",
    };

    $scope.registerInServer = function () {
        User.register($scope.user)
            .then(function (response) {
                alert('Thanks for Register')
                console.log('received from the server', response);
                $location.path('/Login');
            }, function (response) {
                alert('Fill all the fields please')
            });
    };
}

//make sure that the user password check input value is the same as the first.
var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};
app.directive("compareTo", compareTo);