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
    , 'modules/publish/controllers/dashboard'
    , 'modules/publish/controllers/lock'
    //服务
    , 'angular/angular-resource'
], function(console, angular, dashboardCtrl, lockCtrl){
    'use strict';

    console.group('公共模块初始化');

    var publishModule = angular.module('publishModule', ['ngResource']);
    publishModule.controller('dashboardCtrl', dashboardCtrl);
    publishModule.controller('lockCtrl', lockCtrl);

    console.groupEnd();

    return publishModule;
});