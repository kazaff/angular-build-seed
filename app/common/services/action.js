/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: 上午10:02
 */
define(function(){
    'use strict';

    var initialize = function(module, routeRules){

        module.factory('action', ['acl', '$q', function(acl, $q){
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

        return module;
    };

    return {
        initialize: initialize
    };
});