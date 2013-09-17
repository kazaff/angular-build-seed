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
    , 'modules/user/controllers/self'
    , 'modules/user/controllers/self-psw'
    //服务
    , 'modules/user/services/user'
    //指令
    , 'modules/user/directives/password-strength'
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, userSelfCtrl, userSelfPswCtrl, user, pswStrength){
   'use strict';

    console.group('用户模块初始化');

    var userModule = angular.module('userModule', ['ngResource', '$strap.directives']);

    userModule.factory('user', user);

    userModule.controller('userSelfCtrl', userSelfCtrl);
    userModule.controller('userSelfPswCtrl', userSelfPswCtrl);

    userModule.directive('kzPasswordStrength', pswStrength);

    console.groupEnd();

    return userModule;
});