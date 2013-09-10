/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 下午3:43
 */
define(function(){
    'use strict';

    return  {
        group: 'publish'
        , title: '仪表盘'
        , icon: 'icon-home'
        , son:[{
            uri: '/dashboard'
            , controller: 'dashboardCtrl'
            , templateUrl: 'modules/publish/templetes/dashboard.html'
            , ifMenu: true
            , name: 'dashboard'
            , title: '控制台'
            , icon: 'icon-th'
            , api: 'restV1/dashboard/get'
        }]
    };
});