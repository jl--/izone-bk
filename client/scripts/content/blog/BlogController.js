;
'use strict';
angular.module('app')
    .controller('BlogController', ['$scope', '$stateParams', '$state','categories', 'APP_CONFIG',
        function($scope, $stateParams, $state,categories,APP_CONFIG) {
            var scope = this;
            scope.categories = categories;
            console.log('////////// blog controller ///////////');
            scope.sortedPosts = [];
            scope.archives = [];
            scope.status = {};
            scope.status.postsViewType = 'categories';
            scope.domain = APP_CONFIG.api.base;
            scope.changePostsViewType = function(type) {
                scope.status.postsViewType = type;
            };
            function getCategory(id){
                var category = null;
                for(var i = scope.categories.length - 1; i>=0 ; i--){
                    if(scope.categories[i]._id === id){
                        category = scope.categories[i];
                        break;
                    }
                }
                return category;
            }
            scope.setCurrentCategory = function(id) {
                scope.currentCategory = getCategory(id);
                scope.status.viewingPosts = true;
                console.log(scope.currentCategory);
            };



            scope.readMore = function(categoryName,postId, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                var target = angular.element($event.target);
                if (angular.element($event.target).hasClass('read-more')) {
                    scope.status.readingPost = true;
                    $state.go('blog.detail',{
                        categoryName: categoryName,
                        postId: postId
                    });
                }
            };

            ////////////////////////////
            /// archive
            /////////////////////////////////
            function archive(){
                var len = scope.sortedPosts.length-1;
                var dates = [];
                for(; len >=0 ; len -- ){
                    dates.unshift(new Date(scope.sortedPosts[len].createdAt));
                }
                len = dates.length -1;
                for( ; len >=0 ; len-- ){
                    if(!dates[len+1] || dates[len].getFullYear() !== dates[len+1].getFullYear() || dates[len].getMonth() !== dates[len+1].getMonth() || dates[len].getDate() !== dates[len+1].getDate()){
                        var breakPoint = {
                            title: '' + dates[len].getFullYear() + '/' + (dates[len].getMonth() +1) + '/' + dates[len].getDate(),
                            posts: []
                        };
                        breakPoint.posts.push(scope.sortedPosts[len]);
                        scope.archives.unshift(breakPoint);
                    }else{
                        scope.archives[0].posts.push(scope.sortedPosts[len]);
                    }
                }
            }
            scope.sortPosts = function(){
                var len = scope.categories.length - 1;
                for( ; len >=0 ; len--){
                    scope.sortedPosts = scope.sortedPosts.concat( scope.categories[len].posts.map(function(value,index,array){
                        value.category = scope.categories[len].name;
                        value.cid = scope.categories[len]._id;
                        return value;
                    }) );
                }
                scope.sortedPosts.sort(function(a,b){
                    return b.createdAt > a.createdAt ? 1 : (b.createdAt < a.createdAt ? -1 : 0);
                });
                archive();
            };
            scope.categories.$promise.then(function() {
                scope.sortPosts();
            });
            $scope.$on('viewPost',function(data){
            });
            $scope.$parent.contentCtrl.status.isArchivePanelHidden = false;
        }
    ]);