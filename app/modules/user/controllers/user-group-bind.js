/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: 下午3:45
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$routeParams','group', '$q', function($scope, Auth, Action,$routeParams, Group, $q){
        Auth.isLogined();
        //获取用户信息
        $scope.group={};
        Group.get({gid: $routeParams.gid,uid:0}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            response.parentName = decodeURI(response.parentName);
            response.bindGroupName="";
            angular.forEach( response.bindGroups, function(bind){
                bind.name = decodeURI(bind.name);
                response.bindGroupName+=bind.name+",";
            });
            $scope.group= response;
        });

        //树配置
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            check:{
                enable:true,
                chkStyle:"checkbox"  ,
                autoCheckTrigger: false ,
                chkboxType : { "Y": "", "N": "" }   //父节点勾选，不勾选子节点
            }
            ,
            callback: {
                onCheck: onCheck ,
                onAsyncSuccess: zTreeOnAsyncSuccess
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'group'
                , autoParam:['id']
                , otherParam:{'type': 'onlyNode',  'auth': window.localStorage.token}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                    });
                }
            }
        };

        //树成功加载数据后执行的回调方法
        function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
            if(treeNode != null ){
                var treeObj = $.fn.zTree.getZTreeObj("selectTree");
                $.each(treeNode.children,function(treeIndex,treeVal){
                    $.each($scope.group.bindGroups,function(index,val){
                        if(treeVal.id==val.id){
                          treeObj.checkNode(treeNode.children[treeIndex], true, true);
                        }
                    });
                });
            }
     //       $scope.$root.$$phase || $scope.$apply();
        };

        //树的选中和取消选中事件函数
        function onCheck (event, treeId, treeNode) {
            if(treeNode!=null)
            {
                if(treeNode.checked)
                {
                    $scope.group.bindGroupName+=treeNode.name+",";
                    $scope.group.bindGroups.push({id:treeNode.id,name:treeNode.name,isParent:treeNode.isParent,checked:treeNode.checked});
                }
                else
                {
                    $scope.group.bindGroups.push({id:treeNode.id,name:treeNode.name});
                    //回调函数有两个参数,第一个是元素索引,第二个为当前值
                    $.each($scope.group.bindGroups,function(key,val){
                        if(val&&val.id==treeNode.id){
                            $scope.group.bindGroups.splice(key,1);
                            //  break;
                        }
                    });
                    $scope.group.bindGroupName="";
                    angular.forEach( $scope.data.bindGroups, function(bind){
                        $scope.group.bindGroupName+=bind.name+",";
                    });
                }
                $scope.$root.$$phase || $scope.$apply();  //避免$digest already in progress
            }
        }

        $scope.save = function(){

            $scope.isLoading = true;
            //去后端更新
            var formData = {
                groupId: $scope.group.groupId

                , bindGroups: []
            };
            angular.forEach( $scope.group.bindGroups, function(bind){
                formData.bindGroups.push(bind.id);
            });
            //去后端更新
            Group.save(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户绑定成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户绑定失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroupBind', 'user'));
                        }
                    });
                }
            });
        };
    }];
});