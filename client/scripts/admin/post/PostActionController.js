;
'use strict';
angular.module('app')
    .controller('PostActionController', ['$scope',
        function($scope) {

            var scope = this;
            scope.status = {};
            scope.tags = [];
            scope.preview = function() {
                $scope.$emit('postPreviewAction');
            };
            scope.addTag = function() {
                if(!scope.status.editable){
                    return ;
                }
                if (scope.tag && scope.tag.length > 0) {
                    if (scope.tags.indexOf(scope.tag) === -1) {
                        scope.tags.push(scope.tag);
                        delete scope.tag;
                        $scope.$emit('postModified');
                    }
                } else {
                    scope.status.addingTag = !scope.status.addingTag;
                }
            };
            scope.removeTag = function(index) {
                scope.tags.splice(index, 1);
                $scope.$emit('postModified');
            };
            $scope.$on('showTags', function(event, tags) {
                scope.tags = tags;
                scope.status.editable = true;
            });
            scope.save = function() {
                $scope.$emit('savePost');
            };
        }
    ]);