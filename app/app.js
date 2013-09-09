/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 上午9:54
 */
define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    , 'angular/angular-resource'
    , 'angular/angular-route'
], function(console, angular){
    'use strict';

    var initialize = function(needModules, routeRules){

        console.group('初始化主模块配置');

        var deps = ['ngResource', 'ngRoute'];
        for(var index in needModules){
            deps.push(needModules[index].name);
        }

        console.info('获取主模块依赖的模块：', deps);

        var mainModule = angular.module('webOS', deps);

        console.groupEnd();
        console.info('定义该应用的主模块：', mainModule.name);

        mainModule.config(['$httpProvider', '$locationProvider', '$routeProvider', function($httpProvider, $locationProvider, $routeProvider){

            $locationProvider.html5Mode(false).hashPrefix('!');

            console.group('初始化主模块的路由规则');

            angular.forEach(routeRules, function(item){
                if(typeof(item) != 'undefined'){
                    angular.forEach(item.son, function(route){

                        console.info('增加路由：', route.uri);

                        $routeProvider.when(route.uri, {
                            templateUrl: route.templateUrl
                            , controller: route.controller
                        });
                    });
                }
            });

            //TODO 避免硬编码
            $routeProvider.otherwise({redirectTo:'/dashboard'});

            console.groupEnd();

            //TODO 为了兼容旧浏览器，需要增加其他浏览器端持久化token的方法
            if(window.localStorage.token){
                $httpProvider.defaults.headers.common['Authorization'] = 'MD ' + window.localStorage.token;
            }
        }]);

        //提供取超链接数据的服务
        mainModule.factory('action', ['acl', '$q', function(acl, $q){

            var data = routeRules;

            //用于获取指定名称的链接数据，action指令使用
            var link = function(name, group){

                var link = {};
                angular.forEach(data, function(item){
                    if(item && item.group == group){
                        angular.forEach(item.son, function(route){
                            if(route.name == name){
                                link = route;
                                return false;
                            }
                        });
                        return false;
                    }
                });

                if(angular.isUndefined(link.status)){
                    //去后端获取
                    var promise = acl.status(link.api);
                    promise.then(function(response){

                        //缓存结果
                        link.status = response.data;
                        response.data = link;
                    });
                    return promise;

                }else{

                    var deferred = $q.defer();
                    deferred.resolve(link);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }
            };

            //用于主菜单的方法
            var menu = function(){
                var menu = [];

                angular.forEach(data, function(item){
                    if(item){
                        var group = {};
                        group.group = item.group;
                        group.title = item.title;
                        group.icon = item.icon;
                        group.son = [];
                        angular.forEach(item.son, function(route){
                            if(route.ifMenu){
                                group.son.push(route);
                            }
                        });

                        if(group.son.length){
                            menu.push(group);
                        }
                    }
                });

                //去后端验证该用户对菜单项是否有权限操作
                //过滤掉后端验证权限不需要的属性，减少http传输的数据
                var argument = [];
                angular.forEach(menu, function(item){
                    var group = {};
                    group.group = item.group;
                    group.son = [];

                    angular.forEach(item.son, function(route){
                        if(angular.isUndefined(route.status)){
                            var info = {};
                            info.name = route.name;
                            info.api = route.api;
                            group.son.push(info);
                        }
                    });

                    argument.push(group);
                });

                var flag = false;
                angular.forEach(argument, function(item){
                    if(item.son.length){
                        flag = true;
                    }
                });

                //若已经存在缓存，则直接返回
                if(!flag){
                    var deferred = $q.defer();
                    deferred.resolve(menu);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }

                //去后端验证
                var promise = acl.verify(argument);
                promise.then(function(response){

                    //处理验证的结果，并缓存到data中，以后就不需要重复请求了
                    angular.forEach(response.data, function(item){
                        //处理menu，用于视图菜单显示
                        angular.forEach(menu, function(menuItem, menuKey){
                            if(menuItem.group == item.group){

                                angular.forEach(item.son, function(route){
                                    angular.forEach(menuItem.son, function(sonItem, sonKey){
                                        if(sonItem.name == route.name){

                                            menuItem.son[sonKey].status = route.status;
                                            return false;
                                        }
                                    });
                                });

                                menu[menuKey] = menuItem;
                                return false;
                            }
                        });
                    });

                    response.data = menu;
                });
                return promise;
            };

            return {
                link: link
                , menu: menu
            };
        }]);

        //定义a标签指令
        mainModule.directive('action', ['action', function(action){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<a></a>'
                , link: function(scope, element, attrs){
                    action.link(attrs.name, attrs.group).success(function(data){
                        element.html('<i class="'+ data.icon + ' ' + (attrs.color ? attrs.color : '') + '"></i> ' + data.title);
                        element.attr('href', '#!' + data.uri);

                        //TODO 需要判断当前用户是否有权限进行该操作
                        //element.remove(); //若无权限，则不显示该链接
                        //element.attr('class', element.attr('class') + ' disabled');   //若无权限，则禁用该链接
                    });
                }
            }
        }]);

        //定义layout上需要的控制器
        //主菜单
        mainModule.controller('menuCtrl', ['$scope', 'action', '$timeout', function($scope, action, $timeout){
            $scope.menu = '';
            action.menu().success(function(data){
                $scope.menu = data;
            });

            $scope.menu2 = '';
            $timeout(function(){
                action.menu().success(function(data){
                    $scope.menu2 = data;
                });
            }, 3000);
        }]);

        return mainModule;
    };

    return {
        initialize: initialize
    };
});