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
    , 'common/init'
    , 'angular/angular-resource'
    , 'angular/angular-route'
    , 'angular/angular-animate'
], function(console, angular, common){
    'use strict';

    var initialize = function(needModules, routeRules){

        console.group('初始化主模块配置');

        var deps = ['ngResource', 'ngRoute', 'ngAnimate'];
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

        //加载通用模块
        common.initialize(mainModule, routeRules);

        return mainModule;
    };

    return {
        initialize: initialize
    };
});