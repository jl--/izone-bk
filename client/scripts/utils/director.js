;
define(['jquery'], function($) {
    var director = {};
    var actors = [];
    var staging = true;


    director.assign = function($actor, onAppear, onActing, onDisappear) {
        if (typeof onAppear === 'function' || typeof onActing === 'function' || typeof onDisappear === 'function') {
            $actor.each(function() {
                var $self = $(this);
                $self.onAppear = onAppear;
                $self.onActing = onActing;
                $self.onDisappear = onDisappear;
                actors.push($self);
                staging = true;
            });
        }
        return this;
    };

    director.direct = function() {
        var $window = $(window),
            data = {},
            actorIndex,
            $actor = null;
        $window.scroll(function(){
            staging = true;
        });

        function action() {
            if (staging) {
                console.log('staging');
                data.winScrollTop = $window.scrollTop();
                data.winHeight = $window.height();
                data.winWidth = $window.width();
                for (actorIndex = actors.length - 1; actorIndex >= 0; actorIndex--) {
                    $actor = actors[actorIndex];
                    if (!$actor.onAppear && !$actor.onActing && !$actor.onDisappear) {
                        actors.splice(actorIndex, 1);
                        continue;
                    }
                    data.actorOffsetTop = $actor.offset().top;
                    data.actorHeight = $actor.outerHeight();

                    if (data.winScrollTop + data.winHeight > data.actorOffsetTop && data.actorOffsetTop + data.actorHeight > data.winScrollTop) {
                        $actor.appearing = true;
                        if ($actor.onAppear) {
                            $actor.onAppear.call(this, $actor);
                            delete $actor.onAppear;
                        }
                        if($actor.onActing){
                            $actor.onActing.call(this,$actor,data);
                        }
                    } else if ($actor.appearing) {
                        $actor.appearing = false;
                        if($actor.onDisappear)
                        $actor.onDisappear.call(this, $actor);
                        delete $actor.onDisappear;
                    }
                }
                staging = false;
            }
            if (actors.length > 0) {
                window.setTimeout(action, 0);
            }
        }
        window.setTimeout(action, 0);
        delete director.direct;
    };

    return director;
});