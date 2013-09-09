/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 上午9:16
 */
define(function(){
    'use strict';

    return ['$location', function($location){
        return function(data){
            //TODO 为了兼容旧浏览器，需要增加其他浏览器端持久化token的方法
            if(!window.localStorage.token){
                //TODO 避免硬编码
                $location.path('/login').replace();
            }

            //如果请求返回的结果中包含授权失败信息，则根据情况跳转
            if(typeof(data) == "object" && data.status == 0){
                //TODO 避免硬编码
                $location.paht('/login').replace();
            }
        };
    }];
});