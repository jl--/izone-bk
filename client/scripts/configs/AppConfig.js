;
'use strict';

angular.module('app.config', [])
    .constant('APP_CONFIG', (function() {

        var domain = 'http://localhost:6001'; // dev

        ///////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////        deployment config
        //////////////////////////////////////////////////////////////////////////////////////////
        //======== uncomment for openshift
        //domain = 'https://izone-domain.rhcloud.com'; // your openshift domain
        

        //======== uncomment for vps
        domain =  'http://jlxy.cz'; ///// your domain
        ////////////////////////////////////////////////////////// end of deployment config

        return {
            api: {
                base: domain,
                login: domain + '/session',
                profile: domain + '/profile',
                category: domain + '/categories',
                post: domain + '/categories/:categoryId/posts',
                avatar: domain + '/profile/avatar',
                portfolio: domain + '/portfolio'
            }
        };
    })());
