/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: 上午10:42
 */
define(function(){
    'use strict';

    //处理要加载的模块的配置文件地址
    var loadModules = function(directorys){
        var deps = [];

        for(var key in directorys){
            deps.push(directorys[key] + '/init');
        }

        return deps;
    };

    //处理要定义的路由规则
    var loadRouteRules = function(directorys){
        var deps = [];

        for(var key in directorys){
            deps.push(directorys[key] + '/route');
        }

        return deps;
    };

    return {
        loadModules: loadModules
        , loadRouteRules: loadRouteRules
    };
});