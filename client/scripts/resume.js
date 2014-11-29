;
requirejs.config({

    baseUrl: 'scripts',
    // paths config is relative to baseUrl
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        director: './utils/director',
        me: './resume/me'
    }
});
requirejs(['director','me'], function(director,me) {

    
    me.getProfile(undefined, function(){
        var $avatar = $('.avatar'),
            $name = $('.name'),
            $location = $('.location'),
            $signature = $('.signature'),
            $skillItems = $('.skill-items');
        $avatar.attr('src',me.profile.avatar).load(function() {
            // director.assign($avatar,delayShow);
            director.assign($('.about-details'),delayShow);

        });
        $name.text(me.profile.name);
        $location.text(me.profile.city);
        $signature.text(me.profile.signature);
        me.profile.skills.forEach(function(element){
            var $skill = $('<div>').addClass('skill'),
                $skillName = $('<span>').addClass('skill-name').text(element.name),
                $skillMetas = $('<div>').addClass('flex-1');
            if(element.relatives.length>0){
                $skillMetas.append($('<span>').addClass('fa fa-circle'));
            }
            element.relatives.forEach(function(relative){
                $skillMetas.append($('<code>').addClass('ml-lg').text(relative));
            });
            if(element.description){
                $skillMetas.append($('<blockquote>').addClass('class_name curly-quotes').text(element.description));
            }
            $skill.append($skillName).append($skillMetas);
            if(element.isMajor){
                $skill.append('<span title="major&expert" class="skill-state fa-stack fa-lg"><i class="fa fa-stack-2x fa-bookmark-o"></i><i class="fa fa-star fa-stack-1x"></i></span>');
            }
            $skillItems.append($skill);
            console.log(element);
        });
        $skillItems.addClass('w-6').show();
        function delayShow($self){
            $self.addClass('bounceIn');
        }
        // director.assign($name,delayShow).assign($location,delayShow).assign($signature,delayShow).assign($('.skills-intro'),delayShow);
         director.assign($('.skills-intro'),delayShow);
    });
    me.getPortfolio(undefined, function(data){
        var $portfolioBox = $('.portfolio'),
            $portfolioItems = $('<div>').addClass('flex-row center');
        me.portfolio.forEach(function(item){
            var $portfolioItem = $('<div>').addClass('portfolio-item'),
                $portfolioItemImg = $('<img>').attr('src', item.img),
                $portfolioItemMetas = $('<div>').addClass('portfolio-item-metas');


            $portfolioItemMetas.append($('<a>').addClass('portfolio-item-link').text('Visit'))
                .append($('<h3>').text(item.title));

            $portfolioItem.append($portfolioItemImg).append($portfolioItemMetas);
            $portfolioItem.addClass('bounceIn');
            $portfolioItems.append($portfolioItem);
        });
        director.assign($portfolioBox,function($self){
            $self.append($portfolioItems);
        });
    });

    // parallax scrolling
    director.assign($('.parallax'), function($self) {}, function($self, data) {
        if(data.winWidth < 960){
            return ;
        }
        var speed = 6;
        var offsetY = data.actorOffsetTop > 0 ? data.winHeight - data.actorOffsetTop : 0,
            ypos = -((data.winScrollTop + offsetY) / speed),
            coords = '50% ' + ypos + 'px';
        var styles = {};
        styles.backgroundPosition = coords;
        $self.css(styles);
    }, function($self) {})
    // appear
    .assign($('.brief'), function($self) {
        $self.addClass('bounceInRight');
    })
    // appear
    .assign($('.keyboard'), function($self) {
        $self.addClass('ani');
    }/*,function($self,data){
        var styles = {};
        styles.left = (100 + data.winScrollTop / 8) + 'px';
        styles.bottom = (100 - data.winScrollTop / 16) + 'px';
        $self.css(styles);
    }*/)
    ;

    director.direct();

});