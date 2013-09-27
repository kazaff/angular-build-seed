/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-26
 * Time: ионГ10:34
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'privilege/:pid/:page', {}, {
            query:{
                method: 'GET'
                , params: {pid: 0}
                , isArray: false
            }
            , changStatus: {
                method: 'POST'
                , params: {opt: 'onlyStatus'}
            }
        });
    }];
});