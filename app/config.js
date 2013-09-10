/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 下午4:04
 */
define(function(){
    //定义要加载的模块
    return window.config = {
        domain: 'http://localhost/uiForWebOS/mock/index.php?rest/V1/'
        , modules:[
            //'modules/publish', 'modules/user', 'modules/privilege', 'modules/application', 'modules/log'
            'modules/publish', 'modules/user'
        ]
    };
});