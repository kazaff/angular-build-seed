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
            , controller: 'prvlistCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-list.html'
            , ifMenu: true
            , name: 'privilegeList'
            , title: '权限列表'
            , icon: 'icon-eye-open'
            , api: 'restV1/privilege/get'
        }
        , {
            uri: '/privilege/create'
            , controller: 'prvAddCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-add.html'
            , ifMenu: false
            , name: 'privilegeAdd'
            , title: '新增权限'
            , icon: 'icon-plus'
            , api: 'restV1/privilege/put'
        }
        , {
            ifMenu: false
            , name: 'privilegeDelete'
            , title: '删除'
            , icon: 'icon-trash'
            , api: 'restV1/privilege/delete'
        }
        , {
            uri: '/privilege/:pid'
            , controller: 'prvEditCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-edit.html'
            , ifMenu: false
            , name: 'privilegeEdit'
            , title: '编辑'
            , icon: 'icon-edit'
            , api: 'restV1/privilege/post'
        }]
    };
});