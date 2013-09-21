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
    //指令
    //库
    , 'angular/angular-resource'
], function(console, angular, loginUserCtrl, loginAllCtrl){
    'use strict';

    console.group('日志模块初始化');

    var logModule = angular.module('logModule', ['ngResource']);

    logModule.controller('logLoginUserCtrl', loginUserCtrl);
    logModule.controller('logLoginAllCtrl', loginAllCtrl);

    console.groupEnd();

    return logModule;
});