/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-2
 * Time: ÏÂÎç2:45
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'userGroupPrivilege/:gid/:page', {}, {
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
            , updateDate: {
                method: 'PUT'
            }
        });
    }];
});