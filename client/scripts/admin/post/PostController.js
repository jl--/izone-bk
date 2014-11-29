;
'use strict';
angular.module('app')
    .controller('PostController', ['$scope', 'NotificationService', 'Category', 'categories', 'Post',
        function($scope, NotificationService, Category, categories, Post) {
            var scope = this;
            scope.status = {};
            scope.metas = {
                category: {},
                post: {}
            };
            scope.categories = categories;
            console.log(scope);

            ///////////
            /// category
            //////////////////////////////
            scope.createCategory = function() {
                if (scope.metas.category.toAdd && scope.metas.category.toAdd.length > 0) {
                    if (scope.categories.some(function(element, index, array) {
                        return element.name === scope.metas.category.toAdd;
                    })) {
                        return;
                    }
                    // save category to server
                    Category.create({
                        name: scope.metas.category.toAdd
                    }, function(category) {
                        delete scope.metas.category.toAdd;
                        scope.categories.push(category);
                        scope.status.addingCategory = false;
                    });
                } else {
                    scope.status.addingCategory = !scope.status.addingCategory;
                }
                console.log(scope);
            };

            scope.deleteCategory = function(index, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                console.log(scope);
                NotificationService.confirm('will delete all posts in this category: ' + scope.categories[index].name + ' ok to continue.', function() {
                    Category.delete({
                        categoryId: scope.categories[index]._id
                    }, function(data) {
                        console.log(data);
                        if (scope.metas.category.index !== undefined) {
                            if (index === scope.metas.category.index) {
                                delete scope.category;
                                delete scope.metas.category.index;
                            } else if (index < scope.metas.category.index) {
                                scope.metas.category.index--;
                            }
                        }
                        if (scope.metas.post.cIndex !== undefined) {
                            if (scope.metas.post.cIndex === index) {
                                delete scope.post;
                                delete scope.metas.post.index;
                                delete scope.metas.post.cIndex;
                            } else if (scope.metas.post.cIndex > index) {
                                scope.metas.post.cIndex--;
                            }
                        }
                        scope.categories.splice(index, 1);
                        console.log(scope);
                    }, function(data) {
                        console.log(data);
                    });
                }, function() {

                });
            };

            scope.setCategory = function(index) {
                if (scope.status.renamingCategory) {
                    return;
                }
                scope.status.viewingPosts = true;
                if (!scope.categories[index].cached) {
                    Category.getOne({
                        categoryId: scope.categories[index]._id
                    }, function(category) {
                        console.log('///// get category /////');
                        category.cached = true;
                        scope.categories[index] = category;
                        scope.category = category;
                        scope.metas.category.index = index;
                        console.log(scope);
                    });
                } else {
                    scope.category = scope.categories[index];
                    scope.metas.category.index = index;
                    console.log(scope);
                }
            };
            scope.isCategoryRenaming = function(index) {
                return index === scope.metas.category.renamingIndex;
            };
            scope.renameCategory = function(index, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                if (!scope.status.renamingCategory) {
                    scope.status.renamingCategory = true;
                    scope.metas.category.renamingIndex = index;
                    scope.metas.category.originalName = scope.categories[index].name;
                } else {
                    if (scope.categories[index].name !== scope.metas.category.originalName) {
                        Category.update({
                            categoryId: scope.categories[index]._id
                        }, {
                            name: scope.categories[index].name
                        }).$promise.then(function(data) {
                            // rename succeed
                            NotificationService.alert('rename succeed');
                        }, function(data) {
                            // rename failed
                            scope.categories[index].name = scope.metas.category.originalName;
                            NotificationService.alert('rename failed..');
                        }).finally(function() {
                            scope.status.renamingCategory = false;
                            delete scope.metas.category.renamingIndex;
                            delete scope.metas.category.originalName;
                        });
                    } else {
                        scope.status.renamingCategory = false;
                        delete scope.metas.category.renamingIndex;
                        delete scope.metas.category.originalName;
                    }
                }
            };

            /////////////////
            /// post
            /// ////////////////////////////////////
            scope.createPost = function() {
                Post.create({
                    categoryId: scope.category._id
                }, null, function(post) {
                    console.log('////// create post//////');
                    console.log(post);
                    scope.category.posts.unshift(post);
                });
            };
            scope.updatePost = function(callback) {
                if (scope.metas.post.modified) {
                    Post.update({
                        categoryId: scope.categories[scope.metas.post.cIndex]._id,
                        postId: scope.post._id
                    }, scope.post, function(post) {
                        console.log('///////// update post //////');
                        console.log(post);
                        delete scope.metas.post.modified;
                        if(callback){
                            callback();
                        }
                        NotificationService.alert('sync post succeed');
                    }, function(data) {
                        NotificationService.alert('sync post failed');
                    });
                }
            };
            scope.isCurrentPost = function(index) {
                return index === scope.metas.post.index;
            };

            function setPost(index){
                delete scope.metas.post._post;
                scope.post = scope.category.posts[index];
                scope.metas.post._post = angular.copy(scope.category.posts[index]);
                scope.metas.post.index = index;
                scope.metas.post.cIndex = scope.metas.category.index;
                scope.metas.post.modified = false;
                $scope.$emit('showPostTags', scope.post.tags);
            }

            scope.setPost = function(index, $event) {
                if(scope.metas.post.modified){
                   NotificationService.confirm('pre post modified, save it ?',function(){
                        scope.updatePost(function(){
                            setPost(index);
                        });
                   },function(){
                        $scope.$apply(function(){
                            scope.categories[scope.metas.post.cIndex].posts[scope.metas.post.index] = scope.metas.post._post;
                            setPost(index);
                        });
                   }); 
                }else{
                    setPost(index);
                }
            };
            scope.deletePost = function(index, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                console.log('////// before delete post ////');
                console.log(scope);
                NotificationService.confirm('sure you want to delete this post: ' + scope.category.posts[index].title + ' ?', function() {
                    Post.delete({
                        categoryId: scope.category._id,
                        postId: scope.category.posts[index]._id
                    },function(post){
                        console.log('///// delete post /////');
                        console.log(post);
                        if(scope.post){
                            if(scope.metas.post.cIndex === scope.metas.category.index){
                                if(scope.metas.post.index === index){
                                    scope.metas.post = {};
                                    delete scope.post;
                                }else if(scope.metas.post.index > index){
                                    scope.metas.post.index --;
                                }
                            }
                        }
                        scope.category.posts.splice(index,1);
                        console.log(scope);
                    });
                }, function() {

                });
            };



            ///////////////////////////
            /// mark modified
            ///////////////////////////////////////////
            scope.markModified = function() {
                scope.metas.post.modified = true;
            };


            ///////////////////////////////////
            /// post preview
            ///////////////////////////////////
            scope.preview = function() {
                if (scope.post && !scope.status.previewing) {
                    scope.status.previewing = true;
                } else {
                    scope.status.previewing = false;
                }
            };


            //////////////////
            /// event handler
            //////////////////////////////////////////////////
            $scope.$on('previewPost', function(event, toPreview) {
                scope.preview();
            });
            $scope.$on('syncPost', function(event) {
                scope.updatePost();
            });
            $scope.$on('markPostModified', function() {
                scope.markModified();
            });

        }
    ]);