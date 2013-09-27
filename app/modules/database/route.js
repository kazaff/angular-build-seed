/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-23
 * Time: 上午11:31
 */
define(function(){
    'use strict';

    return {
        group: 'database'
        , title: '数据库维护'
        , icon: 'icon-hdd'
        , son:[{
            uri: '/database/backup/list'
            , controller: 'dbBackupListCtrl'
            , templateUrl: 'modules/database/templetes/backup-list.html'
            , ifMenu: true
            , name: 'dbBackupList'
            , title: '数据库'
            , icon: 'icon-hdd'
            , api: 'restV1/database/get'
        }
        , {
            ifMenu: false
            , name: 'dbBackup'
            , title: '备份'
            , icon: 'icon-save'
            , api: 'restV1/database/put'
        }
        , {
            ifMenu: false
            , name: 'dbDelete'
            , title: '删除'
            , icon: 'icon-trash'
            , api: 'restV1/database/delete'
        }
        , {
            ifMenu: false
            , name: 'dbDownload'
            , title: '下载'
            , icon: 'icon-download-alt'
            , api: 'restV1/database/get'
        }
        , {
            ifMenu: false
            , name: 'dbRecover'
            , title: '恢复'
            , icon: 'icon-time'
            , api: 'restV1/database/post'
        }]
    };
});