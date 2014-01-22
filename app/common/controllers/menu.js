/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: 上午10:28
 */
define([
    'jquery/nprogress'
], function(NProgress){
    'use strict';

    var initialize = function(module){

        //主菜单
        module.controller('menuCtrl', ['$scope', 'action', 'auth', '$window', '$modal', '$q', '$location', function($scope, Action, Auth, $window, $modal, $q, $location){
            $scope.menu = [];
            Action.menu().success(function(data){

                //把组下包含的uri抽出来，用于方便sidebar-menu指令验证当前组
                angular.forEach(data, function(item, key){
                    data[key].sonUris = [];
                    angular.forEach(item.son, function(route){
                        data[key].sonUris.push(route.uri);
                    });
                });

                $scope.menu = data;
            });

            var modalPromise = $modal({
                template: 'logout.html'
                , persist: true
                , show: false
                , backdrop: 'static'
                , scope: $scope
            });
            var modal = $q.when(modalPromise);

            //用于触发 退出系统的模态窗口
            $scope.modalWin = function(){
                modal.then(function(modalEl){
                    modalEl.modal('show');
                });
            };

            $scope.logout = function(){
                //清除用户信息
                window.localStorage.token = '';

                //跳转到登录页
                $window.location.href = config.host + 'login.html';
            };

            $scope.openStatus = 1;
            $scope.expansion = function(){
                $scope.openStatus = - $scope.openStatus;
            };

            //路由事件
            $scope.$on("$routeChangeStart", function(angularEvent, next){
                NProgress.start();

                //更新面包屑数据
                var breadCrumbs = [];
                var flag = false;
                angular.forEach(Action.data, function(group){

                    angular.forEach(group.son, function(page){
                        if(next.$$route.controller === page.controller){    //确定要去的页面是哪个

                            if(page.ifMenu){    //如果要去的页面是导航中的页面，则需要重新初始化面包屑数据
                                breadCrumbs.push({"name": group.title, "group": group.group, "uri": ""});
                                breadCrumbs.push({"name": page.title, "group": group.group, "uri": $location.path()});
                            }else{  //否则根据情况更新面包屑

                                //获取当前的面包屑数据
                                if(!angular.isUndefined(window.localStorage.breadCrumbs)){
                                    breadCrumbs = JSON.parse(window.localStorage.breadCrumbs);
                                }

                                //检查当前面包屑中是否已包含要去的页面
                                var isOwn = false;
                                angular.forEach(breadCrumbs, function(item){
                                    if(item.uri === $location.path()){
                                        isOwn = true;
                                        return false;
                                    }
                                });

                                //如果没有包含，则添加
                                if(!isOwn){
                                    breadCrumbs.push({"name": page.title, "group": group.group, "uri": $location.path()});
                                }
                            }

                            flag = true;
                            return false;
                        }
                    });

                    if(flag){
                        return false;
                    }
                });

                window.localStorage.breadCrumbs = JSON.stringify(breadCrumbs);
            });

            $scope.$on("$routeChangeSuccess", function(){
                NProgress.done();
            });
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});