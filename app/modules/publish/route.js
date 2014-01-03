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
        , title: '控制台'
        , icon: 'icon-home'
        , son:[
            {
                uri: '/dashboard'
                , controller: 'dashboardCtrl'
                , templateUrl: 'modules/publish/templetes/dashboard.html'
                , ifMenu: true
                , name: 'dashboard'
                , title: '仪表盘'
                , icon: 'icon-th'
                , api: 'restV1/dashboard/get'
            }
            ,{
                uri: '/lock'
                , controller: 'lockCtrl'
                , templateUrl: '../mock/templetes/lock.php'
                , ifMenu: false
                , name: 'lock'
                , title: '锁屏'
                , icon: 'icon-lock'
                , api: ''
                , status: 1
            }
            ,{
                ifMenu: false
                , name: 'logout'
                , title: '退出'
                , icon: 'icon-off'
                , api: ''
                , status: 1
            }
        ]
    };
});