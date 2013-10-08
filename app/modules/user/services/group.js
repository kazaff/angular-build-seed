/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-14
 * Time: ионГ8:52
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){

        return $resource(config.domain + 'usergroup/:gid/:page', {}, {
             groupList: {
                method: 'GET'
                , params: {gid: 0}
            }
            , changStatus: {
                method: 'POST'
                , params: {gid: 'onlyStatus'}
            }
            , remove: {
                method: 'DELETE'
            }
        });
    }];
});