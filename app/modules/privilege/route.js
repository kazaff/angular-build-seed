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
        , {
            uri: '/privilege/uid/:uid/list/:page'
            , controller: 'prvUserListCtrl'
            , templateUrl: 'modules/privilege/templetes/user-privilege-list.html'
            , ifMenu: false
            , name: 'privilegeUserList'
            , title: '权限列表'
            , icon: 'icon-screenshot'
            , api: 'restV1/userPrivilege/get'
        }
        , {
            uri: '/privilege/gid/:gid/list/:page'
            , controller: 'prvUserGroupListCtrl'
            , templateUrl: 'modules/privilege/templetes/user-group-privilege-list.html'
            , ifMenu: false
            , name: 'privilegeUserGroupList'
            , title: '用户组权限'
            , icon: 'icon-screenshot'
            , api: 'restV1/userGroupPrivilege/get'
        }
        , {
            ifMenu: false
            , name: 'privilegeUserDelete'
            , title: '删除'
            , icon: 'icon-trash'
            , api: 'restV1/userPrivilege/delete'
        }
        ,{
            ifMenu: false
            , name: 'privilegeUserEdit'
            , title: '编辑'
            , icon: 'icon-edit'
            , api: 'restV1/userPrivilege/put'
        }
        ,{
            ifMenu: false
            , name: 'privilegeUserGroupEdit'
            , title: '编辑'
            , icon: 'icon-edit'
            , api: 'restV1/userGroupPrivilege/put'
        }
        ,{
            uri: '/privilege/gid/:gid/add'
            , controller: 'userGroupPrvAddCtrl'
            , templateUrl: 'modules/privilege/templetes/user-group-privilege-add.html'
            , ifMenu: false
            , name: 'privilegeUserGroupAdd'
            , title: '新增'
            , icon: 'icon-plus'
            , api: 'restV1/userGroupPrivilege/post'
        }
        ,{
            uri: '/privilege/uid/:uid/add'
            , controller: 'userPrvAddCtrl'
            , templateUrl: 'modules/privilege/templetes/user-privilege-add.html'
            , ifMenu: false
            , name: 'privilegeUserAdd'
            , title: '新增'
            , icon: 'icon-plus'
            , api: 'restV1/userPrivilege/post'
        }]
    };
});