/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 下午4:21
 */
define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    //服务
    , 'modules/application/services/application'
    //指令
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'

], function(console, angular, application){
    'use strict';

    console.group('应用系统模块初始化');

    var appModule = angular.module('appModule', ['ngResource', '$strap.directives']);

    appModule.factory('application', application);

    console.groupEnd();

    return appModule;
});