/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 下午4:22
 */
define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/user/controllers/self'
    , 'modules/user/controllers/self-psw'
    , 'modules/user/controllers/user-list'
    , 'modules/user/controllers/user-edit'
    , 'modules/user/controllers/user-group'
    //服务
    , 'modules/user/services/user'
    , 'modules/user/services/group'
    //指令
    , 'modules/user/directives/password-strength'
    //库
    , 'angular/angular-resource'
    , 'angular/angular-strap'

], function(console, angular, userSelfCtrl, userSelfPswCtrl, userListCtrl, userEditCtrl, userGroupCtrl, user, group, pswStrength){
   'use strict';

    console.group('用户模块初始化');

    var userModule = angular.module('userModule', ['ngResource', '$strap.directives']);

    userModule.factory('user', user);
    userModule.factory('group', group);
    userModule.controller('userSelfCtrl', userSelfCtrl);
    userModule.controller('userSelfPswCtrl', userSelfPswCtrl);
    userModule.controller('userListCtrl', userListCtrl);
    userModule.controller('userEditCtrl', userEditCtrl);
    userModule.controller('userGroupCtrl', userGroupCtrl);

    userModule.directive('kzPasswordStrength', pswStrength);

    console.groupEnd();

    return userModule;
});