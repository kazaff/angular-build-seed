/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-13
 * Time: 上午11:25
 */
define([
    'config'
], function(Config){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', '$http', function($scope, Auth, Action, User, $http){
        Auth.isLogined();

        $scope.user = Auth.userInfo();
        $scope.pristine = angular.copy($scope.user);

        $scope.reset = function(){
            $scope.user = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.user, $scope.pristine);
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //去后端更新
            User.updateSelf($scope.user).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '个人信息更新成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    //更新本地存储
                    auth.userInfo($scope.user);
                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '个人信息更新失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userSelf', 'user'));
                        }
                    });
                }
            });
        };

        //头像上传
        $scope.upload= function(data){

            data.append('userId', $scope.user.id);

            var request = $http({
                method:'POST'
                , url: Config.domain + 'userFace/'
                , data: data
                , headers: {'Content-Type': undefined}  //在ng1.20版本中，一定要设置为undefined（而非'multipart/form-data'），否则后端无法使用$_FILES接收
                ,transformRequest: function(data) { return data;}
            });

            request.then(function(response){
                if(response.data.error == 0){
                    window.localStorage.userPhoto = response.data.file;
                }
            });

            return request;
        }
    }];
});