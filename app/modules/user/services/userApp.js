/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: ионГ10:32
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'userApp/:uid/:aid/:page', {}, {
            query: {
                method: 'GET'
                , isArray: false
            }
            , changStatus: {
                method: 'POST'
                , params: {opt: 'onlyStatus'}
            }
            , create: {
                method: 'PUT'
            }
        });
    }];
});