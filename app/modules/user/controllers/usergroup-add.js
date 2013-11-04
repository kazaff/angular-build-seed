/**
 * Created with JetBrains WebStorm.
 * User: siwenwen
 * Date: 13-10-3
 * Time: 下午2:08
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'action', '$routeParams', '$modal', '$q', 'userGroup', '$location', 'auth', function($scope, Action, $routeParams, $modal, $q, UserGroup, $location, Auth){
        Auth.isLogined();

        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            UserGroup.groupList({page: ++page}).$promise.then(function(response){
                angular.forEach(response.items, function(item){
                    item.name = decodeURI(item.name);
                    item.parentName = decodeURI(item.parentName);
                    item.info = decodeURI(item.info);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        //重置结果集，清空所有筛选条件，包括排序
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;

            $scope.resetFlag = 0;
        };

        //搜索相关的数据
        $scope.searchData = function(){
            page=$routeParams.page-1;
            $scope.data=[];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData=true;

            $location.hash($scope.searchText);

            $scope.downloadData();
        };

        //获取第一屏数据
        $scope.downloadData();

        $scope.form = {};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //树的配置参数
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'group'
                , autoParam:['id', 'dataType']
                , otherParam:{'type': 'onlyNode', 'auth': window.localStorage.token}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    if(!treeNode.nocheck){
                        jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"><img src="./img/plus_alt.png" alt=""/></span>');

                        jQuery("#diyBtn_"+treeNode.id).on("click", function(){


                            //用于启动添加权限的模态窗口
                            $scope.modalWin({groupId: treeNode.id, name: treeNode.name, dataType: treeNode.dataType});

                            $scope.$root.$$phase || $scope.$apply();
                        });
                    }
                }
            }
        };

        //用于触发 权限信息 的模态窗口
        $scope.modalWin = function(item){

            $scope.form.parentId = item.groupId; //保存要增加的权限pid
            $scope.form.parentName = item.name;
            $scope.form.parentType = item.dataType;

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //用于保存新添加的用户组信息
        $scope.addNewUserGroup = function(){

            UserGroup.create({parentId: $scope.form.parentId, name : $scope.form.name, dataType: $scope.form.parentType}).$promise.then(function(response){
                if(response['status'] != 0){
                        var item=[];
                        item.name = $scope.form.name;
                        item.parentName =$scope.form.parentName;
                        item.info = $scope.form.info;
                        $scope.data.push(item);
                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组添加成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组添加失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userGroupAdd', 'user'));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});