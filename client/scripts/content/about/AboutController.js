;'use strict';
angular.module('app')
    .controller('AboutController', ['$scope', 'profile', function($scope,profile){
        var scope = this;
        scope.profile = profile;
        scope.profile.$promise.then(function(){
            console.log('//////// about page //////');
            console.log(scope);
        });
    }]);