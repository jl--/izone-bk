;
define(['jquery'], function($) {
    var domain = "http://localhost:6001";

    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////// deployment config
    //////////////////////////////////////////////////////////////////////////////////////////////
    //===== uncomment for openshift
    //domain = 'https://domain.rhcloud.com'; // your openshift domain
    

    //===== uncomment for vps
    domain = 'http://jlxy.cz'; // your domain
    //////////////////////////////////////////////////////////////// end of deployment config

    var server = {
        portfolio: domain + '/portfolio',
        profile: domain + '/profile'
    };
    var me = {
        profile: {},
        portfolio: []
    };

    me.getProfile = function(onComplete,onSuccess,onError){
        $.ajax({
            url: server.profile,
            type: 'GET',
            dataType: 'json',
            complete: onComplete || function(xhr, textStatus) {
            },
            success:  function(data, textStatus, xhr) {
                me.profile = data;
                if(onSuccess){
                    onSuccess.call(me);
                }
            },
            error: onError || function(xhr, textStatus, errorThrown) {
            }
        });

    };
    me.getPortfolio = function(onComplete,onSuccess,onError){
        $.ajax({
          url: server.portfolio,
          type: 'GET',
          dataType: 'json',
          complete: onComplete || function(xhr, textStatus) {
          },
          success: function(data, textStatus, xhr) {
            me.portfolio = data;
            if(onSuccess){
              onSuccess.call(me);
            }
          },
          error: onError || function(xhr, textStatus, errorThrown) {
          }
        });

    };

    return me;
});
