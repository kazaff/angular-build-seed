/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 下午4:04
 */
define(function(){
    //定义要加载的模块
    return window.config = {
        host: 'http://localhost/angular-build-seed/app/'
        , domain: 'http://localhost/angular-build-seed/mock/index.php?rest/V1/'
        , modules:[
            'modules/publish'
        ]
    };
});