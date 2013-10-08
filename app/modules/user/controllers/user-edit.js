/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-7
 * Time: 下午3:36
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', '$routeParams', '$q', function($scope, auth, Action, User, $routeParams, $q){

        //获取指定用户的信息
        $scope.user = {};
        User.get({uid: $routeParams.uid}).$promise.then(function(response){

            $scope.user = response;
            $scope.user.name = decodeURI(response.name);
            $scope.user.info = decodeURI(response.info);

            $scope.pristine = angular.copy($scope.user);
        });

        //重置修改
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

        //保存修改
        $scope.save = function(){

            $scope.isLoading = true;

            //去后端更新
            var formData = {
                userId: $scope.user.userId
                , name: encodeURIComponent($scope.user.name)
                , idCard: $scope.user.idCard
                , sex: $scope.user.sex
                , type: $scope.user.type
                , email: $scope.user.email
                , qq: $scope.user.qq
                , phone: $scope.user.phone
                , mobile: $scope.user.mobile
                , validity: $scope.user.validity
                , info: encodeURIComponent($scope.user.info)
            };

            User.updateUser(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户信息更新成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户信息更新失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userEdit', 'user' , {uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});