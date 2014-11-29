;
'use strict';
angular.module('app')
    .controller('PortfolioController', ['$scope', '$window', 'Portfolio', 'portfolio', 'FileUploader', 'NotificationService','APP_CONFIG',
        function($scope, $window, Portfolio, portfolio, FileUploader, NotificationService,APP_CONFIG) {
            var scope = this;
            scope.status = {};
            scope.metas = {};
            scope.metas.portfolioTypes = ['design','project'];

            scope.portfolio = {
                all: [],
                designs: [],
                projects: []
            };

            portfolio.$promise.then(function(){
                scope.portfolio.all = portfolio;
                scope.portfolio.designs  = portfolio.filter(function(item){
                    return item.type === 'design';
                });
                scope.portfolio.projects  = portfolio.filter(function(item){
                    return item.type === 'project';
                });
                console.log(scope);
            });
            


            FileUploader.FileItem.prototype.addData = FileUploader.FileItem.prototype.addData || function(obj){
                this.formData.push(obj);
            };
            FileUploader.FileItem.prototype.emptyData = FileUploader.FileItem.prototype.emptyData || function(){
                this.formData = [];
            };
            FileUploader.FileItem.prototype.setPortfolioType = FileUploader.FileItem.prototype.setPortfolioType || function(index){
                this.metas = this.metas || {};
                this.metas.type = scope.metas.portfolioTypes[index];
            };


            scope.uploader = new FileUploader({
                url: APP_CONFIG.api.portfolio,
                headers: {
                    Authorization: 'Bearer ' + $window.sessionStorage.token
                }
            });
            scope.uploader.onSuccessItem = function(item,response,status,headers){
                console.log('item success');
                console.log(response);
                if(response.type === 'project'){
                    console.log('project');
                   scope.portfolio.projects.push(response); 
                }else{
                   scope.portfolio.designs.push(response); 
                   console.log('design');
                }
                if(scope.uploader.progress == 100){
                    scope.status.adding = false;
                }
            };
            scope.uploader.onErrorItem = function(item,response,status,headers){
                console.log('item error');
                item.emptyData();
            };


            scope.uploadItem = function(item){
                item.addData(item.metas);
                console.log(item);
                item.upload();
            };


            scope.editPortfolioItem = function(item,index){
                item.status = item.status || {};
                if(item.status.editing){
                    if(item.title !== ''){
                        Portfolio.update({
                            portfolioId: item._id
                        },item).$promise.then(function(data){
                            console.log('edit succeed');
                            console.log(data);
                        },function(data){
                            console.log('edit faild');
                            console.log(data);
                        }).finally(function(){
                            delete item.status;
                        });

                    }else{

                    }

                }else{
                    item.status.editing = true;
                }

            };
            scope.deletePortfolioItem = function(item,index){
                NotificationService.confirm("sure?",function(){
                    Portfolio.delete({
                        portfolioId: item._id
                    }).$promise.then(function(data){
                        console.log("delete succeed");
                        console.log(data);
                        if(item.type === 'project'){
                            scope.portfolio.projects.splice(index,1);
                        }else{
                            scope.portfolio.designs.splice(index,1);
                        }
                    });
                },function(){

                });
            };

            $scope.$on('addPortfolio', function() {
                scope.status.adding = true;
                scope.uploader.clearQueue();
            });
        }
    ]);