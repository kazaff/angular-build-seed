/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-2
 * Time: обнГ2:45
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'userPrivilege/:uid/:page', {}, {
            query: {
                method: 'GET'
                , isArray: false
            }
            , changStatus: {
                method: 'POST'
                , params: {opt: 'onlyStatus'}
            }
            , create: {
                method: 'POST'
            }
        });
    }];
});