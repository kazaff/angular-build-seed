/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-16
 * Time: 上午8:52
 */
 define(function(){
     'use strict';

     return ['$scope', 'user', function($scope, User){

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

             User.updateSelfPsw({psw: encodeURIComponent(JSON.stringify(psw))}).$promise.then(function(response){
                 if(response['status'] == 1){
                     //TODO 修改成功提示

                     $scope.originalPsw = null;
                     $scope.newPsw = null;
                     $scope.comparePsw = null;
                     $scope.isAuthed = 0;
                 }
             });
         };
     }];
 });