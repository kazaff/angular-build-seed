/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-23
 * Time: 上午11:30
 */
define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/database/controllers/db-list'
    //服务
    , 'modules/database/services/database'
    //指令
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, dbBackupListCtrl, db){
    'use strict';

    console.group('数据库模块初始化');

    var dbModule = angular.module('dbModule', ['ngResource', '$strap.directives']);

    dbModule.factory('db', db);

    dbModule.controller('dbBackupListCtrl', dbBackupListCtrl);


    console.groupEnd();

    return dbModule;
});