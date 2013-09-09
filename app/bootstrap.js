'use strict';

require.config({
    baseUrl: '.'
    , paths: {
        'angular': 'lib/angularJS'
    }
    , shim: {
        'lib/bootstrap/bootstrap': ['lib/jquery']
        , 'angular/angular-resource': ['angular/angular']
        , 'angular/angular-route': ['angular/angular']
        , 'angular/angular': {
            exports: 'angular'
        }
        , 'lib/console-min': {
            exports: 'console'
        }
    }
    , charset: function(url){
        if(/lib/.test(url)){
            return 'utf-8';
        }
        return 'gbk';
    }
});

require([
    'require'
    , 'lib/console-min'
    , 'utils/loader'
    , 'lib/jquery'
    , 'angular/angular'
    , 'config'
    , 'lib/modernizr'
], function(require, console, loader, jquery, angular, config){

    console.group('webOS应用');
    console.info('AngularJS版本：', angular.version.full);

    console.group('判断浏览器是否内置支持json');
    if(!window.JSON){
        console.log('不支持，加载JSON2');
        require(['lib/json2']);
    }else{
        console.log('支持');
    }
    console.groupEnd();

    console.group('判断浏览器的JS引擎是否支持ES5标准');
    if(!Function.prototype.bind){
        console.log('不支持，加载es5-shim');
        require(['lib/es5-shim']);
    }else{
        console.log('支持');
    }
    console.groupEnd();

    console.group('确定要加载的模块');
    console.info('应用要加载的业务模块：', config.modules);
    console.groupEnd();

    var deps = ['./app'].concat(loader.loadRouteRules(config.modules), loader.loadModules(config.modules));
    require(deps, function(){

        console.info('requireJS的导入的模块：', arguments);
        console.group('计算要创建的路由规则数据');

        //由于每个合法的模块都会包含init.js和route.js，所以这两类文件的个数应该是相等的
        var routes = [];
        for(var index = 1, max = (arguments.length - 1) / 2; index <= max; index++){
            routes.push(arguments[index]);
        }

        console.info('需要定义的路由数据：', routes);
        console.groupEnd();
        console.group('计算要加载的业务模块');

        var modules = [];
        for(var index = (arguments.length - 1) / 2 + 1, max = arguments.length; index < max; index++ ){
            if(typeof(arguments[index]) == 'undefined'){
                throw new Error('欲加载的模块配置文件不符合AMD语法');
            }

            modules.push(arguments[index]);
        }

        console.info('需要加载的业务模块：', modules);
        console.groupEnd();

        var mainModule = arguments[0].initialize(modules, routes);

        console.info('主模块赋予根DOM');

        angular.bootstrap(window.document, [mainModule.name]);
    });
});