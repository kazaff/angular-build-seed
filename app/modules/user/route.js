/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 下午3:01
 */
define(function(){
    'use strict';

    return {
        group: 'user'
        , title: '用户管理'
        , icon: 'icon-user'
        , son:[{
            uri: '/users/list/:page'
            , controller: 'userListCtrl'
            , templateUrl: 'modules/user/templetes/user-list.html'
            , ifMenu: true
            , name: 'userList'
            , title: '列表'
            , icon: 'icon-user'
            , api: 'restV1/users/get'
        }
        , {
            uri: '/user/add'
            , controller: 'userAddCtrl'
            , templateUrl: 'modules/user/templetes/user-add.html'
            , ifMenu: false
            , name: 'userAdd'
            , title: '新增用户'
            , icon: ''
            , api: 'restV1/user/post'
        }
        , {
            uri: '/user/edit/:uid'
            , controller: 'userEditCtrl'
            , templateUrl: 'modules/user/templetes/user-edit.html'
            , ifMenu: false
            , name: 'userEdit'
            , title: '编辑'
            , icon: 'icon-user'
            , api: 'restV1/user/put'
        }
        ,{
            uri: '/user/info/:uid'
            , controller: 'userInfoCtrl'
            , templateUrl: 'modules/user/templetes/user-info.html'
            , ifMenu: false
            , name: 'userInfo'
            , title: '详细信息'
            , icon: ''
            , api: 'restV1/user/get'
        }
        ,{
            uri: '/user/delete/:uid'
            , controller: 'userDeleteCtrl'
            , templateUrl: 'modules/user/templetes/user-delete.html'
            , ifMenu: false
            , name: 'userDelete'
            , title: '删除'
            , icon: ''
            , api: 'restV1/user/delete'

        },
        {
            uri: '/user/self'
            , controller: 'userSelfCtrl'
            , templateUrl: 'modules/user/templetes/user-self.html'
            , ifMenu: false
            , name: 'userSelf'
            , title: '个人信息'
            , icon: 'icon-user'
            , api: 'restV1/user/get'
        }]
    };
});