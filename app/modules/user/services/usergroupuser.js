/**
 * Created with JetBrains WebStorm.
 * User: @sww
 * Date: 13-10-18
 * Time: ионГ9:09
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){

        return $resource(config.domain + 'userGroupUser/:gid/:page', {}, {
            groupUserList: {
                method: 'GET'
            }
            , delete: {
                method: 'DELETE'
             }
        });
    }];
});