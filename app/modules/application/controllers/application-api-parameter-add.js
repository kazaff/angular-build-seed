/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-26
 * Time: 上午8:55
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q','$modal', 'api','apiParameter', 'application'
            , function($scope, Auth, Action, $location, $routeParams, $q,$modal, Api,ApiParameter, Application){

        Auth.isLogined();

        $scope.aid = $routeParams.aid;
        $scope.apiId = $routeParams.apiid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = false;
        $scope.data = [];

        //获取应用系统信息
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            $scope.app = response;
        });

        //获取应用系统API信息
        $scope.api = {};
        Api.getApiInfo({aid: $routeParams.aid, apiid: $routeParams.apiid}).$promise.then(function(response){
            response.info = decodeURI(response.info);
            response.requestName = decodeURI(response.requestName);
            $scope.api = response;
        });

        //获取选择方式列表
        $scope.select = {};
        $scope.parameter = {type: true, apiAddrValidity: false};
        Api.getSelectList({page: 0}).$promise.then(function(response){
            $scope.select = response;
            $scope.parameter.selected =  $scope.select[0];

            $scope.pristine = angular.copy($scope.parameter);
        });

        $scope.reset = function(){
            $scope.parameter = angular.copy($scope.pristine);
        };

        $scope.checkAddr = function(){
            $scope.parameterForm.apiAddr.$dirty = true;

            if($scope.parameter.apiAddrValidity == false){

                if(angular.isUndefined($scope.parameter.apiAddr) || $scope.parameter.apiAddr == ''){
                    $scope.parameterForm.apiAddr.$setValidity('required', false);
                }
            }else{
                $scope.parameterForm.apiAddr.$setValidity('required', true);
            }
        };

        $scope.onChange = function(){

            if($scope.parameter.apiAddrValidity == true){

                if($scope.parameter.apiAddr != ''){
                    $scope.parameterForm.apiAddr.$setValidity('required', true);
                }else{
                    $scope.parameterForm.apiAddr.$setValidity('required', false);
                }
            }
        };

        $scope.form = {isHidden: false};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //用于触发 权限信息 的模态窗口
        $scope.modalWin = function(){

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.parameter, $scope.pristine);
        };

        $scope.add = function(){
            var formObj = angular.copy($scope.form);
            $scope.data.push(formObj);
        };

        //修改参数类型
        $scope.changeValidity = function(index, status){

            $scope.parameter.type = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //修改是否隐藏字段
        $scope.changeHidden = function(index, status){

            $scope.form.isHidden = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;
            $scope.parameter.output = $scope.data;

            //去后端更新
            var formData = {
                aid: $scope.aid
                , apiId: $scope.apiId
                , paramType: $scope.parameter.type
                , apiAddr: $scope.parameter.apiAddr
                , apiAddrValidity: $scope.parameter.apiAddrValidity
                , parameterCN: $scope.parameter.parameterCN
                , parameterEN: $scope.parameter.parameterEN
                , output: $scope.parameter.output
                , type: $scope.parameter.selected.id
            };
            ApiParameter.create(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //修改成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统添加API参数成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.parameter);

                }else{
                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '应用系统添加API参数失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid, apiid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiParameterAdd', 'application' , {aid: aid, apiid: apiid}));
                            };
                        }($routeParams.aid ,$routeParams.apiid)
                    });
                }
            });
        };

        //删除指定参数
        $scope.delete = function(index){
            //从列表中删除该条数据
            $scope.data.splice(index, 1);
        };
    }];
});