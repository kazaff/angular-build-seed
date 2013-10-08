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
            , title: '用户列表'
            , icon: 'icon-user'
            , api: 'restV1/users/get'
        }  ,
            {
                uri: '/users/grouplist/:page'
                , controller: 'userGroupCtrl'
                , templateUrl: 'modules/user/templetes/user-group.html'
                , ifMenu: true
                , name: 'userGroup'
                , title: '用户组'
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
            uri: '/user/:uid/info'
            , controller: 'userEditCtrl'
            , templateUrl: 'modules/user/templetes/user-edit.html'
            , ifMenu: false
            , name: 'userEdit'
            , title: '编辑'
            , icon: 'icon-edit'
            , api: 'restV1/user/put'
        }
        , {
            uri: '/group/edit/:gid'
            , controller: 'groupEditCtrl'
            , templateUrl: 'modules/user/templetes/group-edit.html'
            , ifMenu: false
            , name: 'groupEdit'
            , title: '编辑'
            , icon: 'icon-edit'
            , api: 'restV1/user/put'
        }
        , {
            ifMenu: false
            , name: 'userDelete'
            , title: '删除'
            , icon: 'icon-trash'
            , api: 'restV1/user/delete'
        }
        , {
            uri: '/user/self'
            , controller: 'userSelfCtrl'
            , templateUrl: 'modules/user/templetes/user-self.html'
            , ifMenu: false
            , name: 'userSelf'
            , title: '个人信息'
            , icon: 'icon-list-alt'
            , api: 'restV1/user/get'
        }
        , {
            uri: '/user/self-psw'
            , controller: 'userSelfPswCtrl'
            , templateUrl: 'modules/user/templetes/user-self-psw.html'
            , ifMenu: false
            , name: 'userSelfPsw'
            , title: '更改口令'
            , icon: 'icon-key'
            , api: 'restV1/user/put'
        }
        , {
            uri: '/user/:uid/group/list/:page'
            , controller: 'userGroupCtrl'
            , templateUrl: 'modules/user/templetes/user-group.html'
            , ifMenu: false
            , name: 'userGroupList'
            , title: '所属用户组'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
        , {
            uri: '/group/:gid/privilege/list/:page'
            , controller: 'userGroupPrivilegeCtrl'
            , templateUrl: 'modules/user/templetes/user-group-Privilege.html'
            , ifMenu: false
            , name: 'userGroupPrivilege'
            , title: '用户组权限'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
        , {
            uri: '/group/:gid/user/list/:page'
            , controller: 'userGroupCtrl'
            , templateUrl: 'modules/user/templetes/user-group-user.html'
            , ifMenu: false
            , name: 'userGroupUserList'
            , title: '用户组成员'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
        , {
            uri: '/group/:gid/bind/list/:page'
            , controller: 'userGroupCtrl'
            , templateUrl: 'modules/user/templetes/user-group-bind.html'
            , ifMenu: false
            , name: 'userGroupBind'
            , title: '绑定用户组'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
            , {
                uri: '/user/:uid/psw'
                , controller: 'userPswCtrl'
                , templateUrl: 'modules/user/templetes/user-psw.html'
                , ifMenu: false
                , name: 'userPsw'
                , title: '更改口令'
                , icon: 'icon-key'
                , api: 'restV1/user/put'
            }
        , {
            controller: 'userSystemListCtrl'
            , templateUrl: 'modules/user/templetes/user-system-list.html'
            , ifMenu: false
            , name: 'userSystemList'
            , title: '可访问系统'
            , icon: 'icon-cloud'
            , api: 'restV1/userSystem/get'
        }]
    };
});