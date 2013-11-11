/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: 下午3:45
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', '$q', function($scope, Auth, Action, User, $q){
        Auth.isLogined();

        $scope.user = {sex:'-1', type:1, validity: true};
        $scope.pristine = angular.copy($scope.user);

        //验证帐号是否已经存在
        $scope.accountCheckStatus = 0;
        $scope.accountCheck = function(){
            $scope.accountCheckStatus = 1;
            User.checkAccount({account: $scope.user.account}).$promise.then(function(response){

                if(response['status'] == 0){
                    $scope.accountCheckStatus = 0;
                    $scope.userForm.account.$setValidity('exists', false);
                }else{
                    $scope.accountCheckStatus = 2;
                    $scope.userForm.account.$setValidity('exists', true);
                }
            });
        };

        $scope.reset = function(){
            $scope.user = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.user, $scope.pristine);
        };

        //修改有效性
        $scope.changeValidity = function(index, status){

            $scope.user.validity = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //去后端更新
            User.create($scope.user).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户添加成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: !angular.isUndefined(response.msg) ? decodeURI(response.msg) : '用户添加失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userAdd', 'user'));
                        }
                    });
                }
            });
        };
    }];
});