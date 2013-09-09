/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 上午9:43
 */
define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //服务
    , 'common/services/auth'
    , 'common/services/acl'
    //指令
], function(console, angular, auth, acl){
    'use strict';

    console.group('通用模块初始化');

    var commonModule = angular.module('commonModule', ['ngResource']);
    commonModule
        .factory('auth', auth)
        .factory('acl', acl);

    console.groupEnd();

    return commonModule;
});