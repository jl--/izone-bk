;'use strict';

exports.db = {
    connectionUrl: 'mongodb://localhost:27017/izone',
    options:{
        server:{
            socketOptions:{
                keepAlive: 1
            }
        } 
    }
};

exports.server = {
    address: process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
    port: process.env.OPENSHIFT_NODEJS_PORT || 6001
};
exports.server.domain = 'http://' + exports.server.address + ':' + exports.server.port;

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// deployment config
///////////////////////////////////////////////////////////////////////////////////
//================ uncomment for openshift
/*
exports.db.connectionUrl = 'mongodb://' + 
        process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
exports.server.domain = 'https://izone-domain.rhcloud.com'; // your own openshift domain
*/



//================ uncomment for vps
exports.server.address = '104.131.165.132'; // your own vps server ip
exports.server.port = 91;
exports.server.domain = 'http://jlxy.cz'; // your own domain
/////////////////////////////////////////////////////////////////////////// end of deployment config
exports.auth = {
    secretToken: 'secretToken',
    expiresInMinutes: 600
};

exports.regexps = {
    username: /^[\w.-]+$/,
    password: /^[^$]{6,20}$/
};


/////////// config the account for your site.
exports.account = {
    email: 'i.dragonxx@gmail.com', // your own email, 
    password: 'ikm*BB123' // password
};
