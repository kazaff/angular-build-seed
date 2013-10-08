/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 下午3:42
 */
define(function(){
    'use strict';

    return {
        group: 'application'
        , title: '应用系统管理'
        , icon: 'icon-github'
        , son:[{
            uri: '/app/list/:page'
            , controller: 'appListCtrl'
            , templateUrl: 'modules/application/templetes/application-list.html'
            , ifMenu: true
            , name: 'appList'
            , title: '应用系统列表'
            , icon: 'icon-github'
            , api: 'restV1/application/get'
        }]
    };
});