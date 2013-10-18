/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-16
 * Time: 上午8:52
 */
 define(function(){
     'use strict';

     return ['$scope', 'user', 'action', 'auth', function($scope, User, Action, Auth){
         Auth.isLogined();

         //检查是否通过原始密码的认证
         $scope.auth = function(){

             //TODO 防止连续多次点击

             User.authSelf({psw: encodeURIComponent($scope.originalPsw)}).$promise.then(function(response){

                 if(response['status'] == 1){
                     $scope.isAuthed = 1;
                 }
             });
         };

         //检查新密码两次输入是否一致
         $scope.isUnsame = function(){
             return $scope.newPsw != $scope.comparePsw;
         };

         //保存新密码
         $scope.save = function(){

             var psw = {
                 original: $scope.originalPsw
                 , fresh: $scope.newPsw
             };

             User.updateSelfPsw(psw).$promise.then(function(response){
                 if(response['status'] == 1){

                     //修改成功提示
                     angular.element.gritter.add({
                         title: '提示'
                         , text: '密码更改成功!'
                         , class_name: 'winner'
                         , image: 'img/card.png'
                         , sticky: false
                     });

                     $scope.originalPsw = null;
                     $scope.newPsw = '';
                     $scope.comparePsw = null;
                     $scope.isAuthed = 0;

                 }else{
                     //修改错误提示
                     angular.element.gritter.add({
                         title: '提示'
                         , text: '密码更改失败!'
                         , class_name: 'loser'
                         , image: 'img/card.png'
                         , sticky: false
                         , before_close: function(e, manual_close){
                             $scope.$apply(Action.forward('userSelfPsw', 'user'));
                         }
                     });
                 }
             });
         };
     }];
 });