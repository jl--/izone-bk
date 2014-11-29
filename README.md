# izone

> simple personal blog & portfolio & resume website built with angularjs & nodejs..
> [example](http:jlxy.cz) 

===

### Tech stack
- angularjs
- nodejs _expressjs_
- sass
- bootstrap
- mongodb
- bower
- grunt
- jwt
- restful
- easy config for deployment on openshift & vps

===

### Features
- post
    + CURD
    + categories
    + tags
    + markdown & real-time preview
    + highlight
    + disqus
- portfolio
    + portfolio item CURD
    + image | link | title | description
    + showoff page
- profile setting
    + basis info [avatar,name,birth,city,characters,description]
    + edu list
    + skills
    + contact info
    + work experience
- about/resume
    + based on profile setting
- ***All Pages Are of Responsive Design***

===

## install:
```
git clone https://github.com/jl-/izone.git
cd izone
cd client
bower install
cd ..
npm install
```

===

### basic config:
- server/configs/config.js
    + exports.account

===

## dev
 ```
- grunt app:admin  // for admin page
- grunt app:index  // for homepage
- grunt app:resume // for resume page
- grunt app:serve // this won't launch the browser
 ```

===

### grunt usemin for deployment 
`grunt build`

===

### deployment config:
- server/configs/config.js
- client/scripts/configs/AppConfig.js
- client/scripts/resume/me.js
- client/partials/content/blog/detail.tpl.html


> follow the instruction in the comment area of the config files listed above
