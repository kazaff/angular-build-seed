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
    , 'angular/angular-resource'
    //控制器
    //服务
], function(console, angular){
   'use strict';

    console.group('用户模块初始化');

    var userModule = angular.module('userModule', ['ngResource']);

    console.groupEnd();

    return userModule;
});