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
    , 'modules/privilege/controllers/privilege-list'
    //服务
    , 'modules/privilege/services/privilege'
    //指令
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, prvListCtrl, privServ){
    'use strict';

    console.group('权限模块初始化');

    var privilegeModule = angular.module('privilegeModule', ['ngResource']);

    privilegeModule.factory('privilege', privServ);

    privilegeModule.controller('prvListCtrl', prvListCtrl);

    console.groupEnd();

    return privilegeModule;
});