/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 上午9:43
 */
define([
    //标准库
    'lib/console-min'
    //服务
    , 'common/services/auth'
    , 'common/services/acl'
    , 'common/services/action'
    //指令
    , 'common/directives/action'
    , 'common/directives/sidebar-menu'
    , 'common/directives/bread-crumbs'
    , 'common/directives/table-fixed-header'
    , 'common/directives/switch'
    , 'common/directives/ztree'
    //控制器
    , 'common/controllers/menu'
], function(console, auth, acl, actionS, actionD, siderbarMenu, breadCrumbs, tableFixedHeader, switchD, ztree, menu){
    'use strict';

    var initialize = function(module, routeRules){
        console.group('通用模块初始化');

        console.info('初始化服务：', ['auth', 'acl', 'action']);
        //初始化服务
        auth.initialize(module, routeRules);
        acl.initialize(module, routeRules);
        actionS.initialize(module, routeRules);

        console.info('初始化指令：', ['action', 'siderbar-menu', 'bread-crumbs', 'table-fixed-header']);
        //初始化指令
        actionD.initialize(module);
        siderbarMenu.initialize(module);
        breadCrumbs.initialize(module);
        tableFixedHeader.initialize(module);
        switchD.initialize(module);
        ztree.initialize(module);

        console.info('初始化控制器：', ['menu']);
        //初始化控制器
        menu.initialize(module);

        console.groupEnd();

        return module;
    }

    return {
        initialize: initialize
    };
});