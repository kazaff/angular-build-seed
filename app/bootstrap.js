'use strict';
/*baseUrl指明的是所有模块的base URL，比如”lib/jquery”所加载的script实际上就是./lib/jquery.js。注意，以.js结尾的文件加载时不会使用该baseUrl，
它们仍然会使用当前index.html所在的相对路径来加载，所以仍然要加上”./js/”。如果baseUrl没有指定，那么就会使用data-main中指定的路径。
paths中定义的路径是用于替换模块中的路径，如下面的'angular/angular'具体的JavaScript文件路径是/lib/angularJS/angular.js。
waitSeconds是指定最多花多长等待时间来加载一个JavaScript文件，用户不指定的情况下默认为7秒。
另外一个重要的配置是packages，它可以指定其他符合CommonJS AMD规范的目录结构，由此带来了丰富的扩展性。如Dojo、jQuery等的模块也可以通过该配置来让RequireJS加载。
其他可配置的选项还包括locale、context、deps、callback等，有兴趣的读者可以在RequireJS的官方网站查阅相关文档。
*/
require.config({
    baseUrl: '.'
    , paths: {
        'angular': 'lib/angularJS'
    }
    , shim: {
        'lib/bootstrap/bootstrap': ['lib/jquery']
        , 'angular/angular-resource': ['angular/angular']
        , 'angular/angular-route': ['angular/angular']
        , 'angular/angular-animate': ['angular/angular']
        , 'angular/angular-strap': ['angular/angular', 'lib/bootstrap/bootstrap']
        , 'angular/angular': {
            exports: 'angular'
            , deps: ['lib/jquery']
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
    , 'lib/console-min'          //当字符串是以”.js”结尾，或者以”/”开头，或者就是一个URL时，RequireJS会认为用户是
                                   // 在直接加载一个JavaScript文件，否则，当字符串是类似”my/module”的时候，它会认为这
                                   // 是一个模块，并且会以用户配置的baseUrl和paths来加载相应的模块所在的JavaScript文件。
    , 'utils/loader'
    , 'lib/jquery'
    , 'angular/angular'
    , 'config'
    , 'lib/modernizr'
    , 'lib/bootstrap/bootstrap'
], function(require, console, loader, jquery, angular, config){      //这里的参数都是使用define()方法定义的模块

    console.group('webOS应用');

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