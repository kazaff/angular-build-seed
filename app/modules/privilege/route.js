/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 下午3:23
 */
define(function(){
    'use strict';

    return {
        group: 'privilege'
        , title: '权限管理'
        , icon: 'icon-eye-open'
        , son:[{
            uri: '/privilege/list/:page'
            , controller: 'prvListCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-list.html'
            , ifMenu: true
            , name: 'privilegeList'
            , title: '权限列表'
            , icon: 'icon-eye-open'
            , api: 'restV1/privilege/get'
        }
        ,{
            uri: '/privilege/user/:uid/list/:page'
            , controller: 'prvUserListCtrl'
            , templateUrl: 'modules/privilege/templetes/user-privilege-list.html'
            , ifMenu: false
            , name: 'privilegeUserList'
            , title: '权限列表'
            , icon: 'icon-screenshot'
            , api: 'restV1/privilege/get'
        }]
    };
});