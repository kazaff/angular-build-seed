/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 下午4:22
 */
define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/user/controllers/userSelf'
    //服务
    , 'modules/user/services/user'
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, userSelfCtrl, user){
   'use strict';

    console.group('用户模块初始化');

    var userModule = angular.module('userModule', ['ngResource', '$strap.directives']);

    userModule.factory('user', user);

    userModule.controller('userSelfCtrl', userSelfCtrl);

    console.groupEnd();

    return userModule;
});