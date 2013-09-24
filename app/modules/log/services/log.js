/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-22
 * Time: ионГ8:25
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'log/:type/uid/:uid/page/:page', {}, {
            loginList: {
                method: 'GET'
                , params: {type: 'login'}
            }
            , actionList: {
                method: 'GET'
                , params: {type: 'action',action:'@action'}
            }
        });
    }];
});