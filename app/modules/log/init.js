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
    , 'modules/log/controllers/login-user'
    , 'modules/log/controllers/login-all'
    //服务
    , 'modules/log/services/log'
    //指令
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, loginUserCtrl, loginAllCtrl, log){
    'use strict';

    console.group('日志模块初始化');

    var logModule = angular.module('logModule', ['ngResource', '$strap.directives']);

    logModule.factory('log', log);

    logModule.controller('logLoginUserCtrl', loginUserCtrl);
    logModule.controller('logLoginAllCtrl', loginAllCtrl);

    console.groupEnd();

    return logModule;
});