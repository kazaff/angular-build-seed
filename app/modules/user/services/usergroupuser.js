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

        return $resource(config.domain + 'userGroupUser/:gid/:uid/:page', {}, {
            groupUserList: {
                method: 'GET'
                , params: {gid: 1}
            }
            ,delete: {
                method: 'DELETE'
                , params: {gid: 1}
            }
        });
    }];
});