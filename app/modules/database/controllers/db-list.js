/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-17
 * Time: 下午3:52
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', 'auth', 'action', 'db', function($scope, $routeParams, auth, Action, Db){
        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Db.query({page: ++page, file: 0}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.fileName = decodeURI(item.fileName);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        //恢复数据库
        //ID：备份文件ID
        $scope.dbBackup = function(){

            //若正在执行，则不重复执行
            if($scope.isLoading){
                return;
            }

            $scope.isLoading = true;
            Db.backup({file: 0,page: page}).$promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '备份失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('dbBackupList', 'database'));
                        }
                    });
                }else{
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '备份成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    }),
                    function add() {
                        var item = response.data;
                        item.fileName = decodeURI(item.fileName);
                        $scope.data.push(item);
                    }();
                };
                $scope.isLoading = false;
            });
        };

        //恢复数据库
        $scope.dbRecover = function(filename){
            $scope.isSuccess=true;
            Db.recover({file: filename, page: page}).$promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '恢复失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('dbBackupList', 'database'));
                        }
                    });
                }else{
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '恢复成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };

        //下载
        //TODO
        $scope.dbDownload = function(){
            Db.query({file: 0,page: page,Download:1}).$promise.then(function(data){
                var blob = new Blob([data], {type: "application/octet-stream"});
                saveAs(blob, 'hello.png');
            });
        };

        //删除一条记录
        //id: 要删除的文件id
        //index 当前行的数据索引位置
        $scope.dbDelete = function(id, index){
            Db.delete({file: 0, page: page}).$promise.then(function(response){
                if(response['status'] == 0){
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('dbBackupList', 'database'));
                        }
                    });
                }
                else{
                    $("tr#"+id).addClass("delete-line").fadeOut(1000,function(){$scope.data.splice(index, 1)}) ;
                }
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

        //获取第一屏数据
        $scope.downloadData();
    }];
});