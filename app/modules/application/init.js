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
    , 'modules/application/controllers/application-list'
    , 'modules/application/controllers/application-add'
    , 'modules/application/controllers/application-edit'
    , 'modules/application/controllers/application-ip-list'
    , 'modules/application/controllers/application-ip-add'
    , 'modules/application/controllers/application-ip-edit'
    , 'modules/application/controllers/application-api-list'
    , 'modules/application/controllers/application-api-add'
    , 'modules/application/controllers/application-api-edit'
    //服务
    , 'modules/application/services/application'
    , 'modules/application/services/ip'
    , 'modules/application/services/api'
    //指令
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'

], function(console, angular, appListCtrl, appAddCtrl, appEditCtrl, appIpListCtrl, appIpAddCtrl, appIpEditCtrl,appApiListCtrl,appApiAddCtrl,appApiEditCtrl, application, ipServ,apiServ){
    'use strict';

    console.group('应用系统模块初始化');

    var appModule = angular.module('appModule', ['ngResource', '$strap.directives']);

    appModule.factory('application', application);
    appModule.factory('ip', ipServ);
    appModule.factory('api', apiServ);

    appModule.controller('appListCtrl', appListCtrl);
    appModule.controller('appAddCtrl', appAddCtrl);
    appModule.controller('appEditCtrl', appEditCtrl);
    appModule.controller('appIpListCtrl', appIpListCtrl);
    appModule.controller('appIpAddCtrl', appIpAddCtrl);
    appModule.controller('appIpEditCtrl', appIpEditCtrl);
    appModule.controller('appApiListCtrl', appApiListCtrl);
    appModule.controller('appApiAddCtrl', appApiAddCtrl);
    appModule.controller('appApiAddCtrl', appApiEditCtrl);
    console.groupEnd();

    return appModule;
});