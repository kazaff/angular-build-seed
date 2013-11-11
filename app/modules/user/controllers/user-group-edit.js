/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-11-1
 * Time: 上午9:08
 */
define(function(){
    'use strict';

    return ['$scope', 'action', '$routeParams', 'userGroup', '$location', 'auth', '$q', function($scope, Action, $routeParams, userGroup, $location, Auth, $q){
        Auth.isLogined();

        //获取指定用户组信息
        var gid = $routeParams.gid;
        $scope.group = {};
        userGroup.find({gid: gid}).$promise.then(function(response){
            response.parentName = decodeURI(response.parentName);
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);

            $scope.group = response;

            $scope.pristine = angular.copy($scope.group);
        });

        //重置修改
        $scope.reset = function(){
            $scope.group = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.group, $scope.pristine);
        };

        //树的配置参数
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onMouseDown: onMouseDown
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'group'
                , autoParam:['id', 'dataType']
                , otherParam:{'type': 'onlyNode', 'auth': window.localStorage.token}
            }
        };

        function onMouseDown(event, treeId, treeNode) {
            if(treeNode != null)
            {
                $scope.group.parentName = treeNode.name;
                $scope.group.parentId = treeNode.id;
                $scope.group.dataType = treeNode.dataType;

                $scope.$root.$$phase || $scope.$apply();  //避免$digest already in progress
            }
        }

        //修改有效性
        $scope.changeValidity = function(item, status){

            $scope.group.validity = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //更新用户组
        $scope.updateDate = function(){

            //去后端更新
            var formData = {
                gid: $scope.group.groupId
                , name: $scope.group.name
                , parentId: $scope.group.parentId
                , dataType: $scope.group.dataType
                , validity: $scope.group.validity
                , info: $scope.group.info
            };

            userGroup.updateData(formData).$promise.then(function(response){
                if(response['status'] != 0){

                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组资料更改成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.group);

                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组资料更改失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('groupEdit', 'user' , {gid: gid}));
                            };
                        }($routeParams.gid)
                    });
                }
            });
        };
    }];
});