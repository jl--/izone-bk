;'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var config = {
        client: {
            base: 'client',
            styles: 'client/styles',
            scripts: 'client/scripts',
            dist: 'client/dist'
        }
    };

    grunt.initConfig({
        config: config,
        sass: {
            options: {
                style: 'expended'
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= config.client.styles %>',
                    src: '**/*.scss',
                    dest: '<%= config.client.styles %>',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 5 version']
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= config.client.styles %>',
                    src: '**/*.css',
                    dest: '<%= config.client.styles %>'
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '*',
                base: '<%= config.client.base %>',
                livereload: 35729
            },
            admin: {
                options: {
                    open: 'admin.html'
                }
            },
            index: {
                options: {
                    open: 'index.html'
                }
            },
            resume: {
                options: {
                    open: 'resume.html'
                }
            },
            serve:{

            }
        },
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            sass: {
                files: ['<%= config.client.styles %>/**/*.scss'],
                tasks: ['sass:app']
            },
            css: {
                files: ['<%= config.client.styles %>/**/*.css'],
                tasks: ['newer:autoprefixer:app']
            },
            html: {
                files: ['<%= config.client.base %>/**/*.html']
            },
            js: {
                files: ['<%= config.client.scripts %>/**/*.js']
            }
        },

        useminPrepare: {
            admin:{
                src: '<%= config.client.base %>/admin.html',

            },
            index:{
                src: '<%= config.client.base %>/index.html'
            }
        },
        concat: {
            adminCss:{
                files: [{
                    dest: '<%= config.client.styles %>/.tmp/concat/css/admin.css',
                    src: [
                        '<%= config.client.base %>/bower_components/normalize.css/normalize.css',
                        '<%= config.client.base %>/bower_components/bootstrap/dist/css/bootstrap.css',
                        '<%= config.client.base %>/bower_components/fontawesome/css/font-awesome.css',
                        '<%= config.client.base %>/bower_components/highlightjs/styles/xcode.css',
                        '<%= config.client.styles %>/index.css',
                    ]
                }]
            },
            indexCss:{
                files: [{
                    dest: '<%= config.client.styles %>/.tmp/concat/css/index.css',
                    src: [
                        '<%= config.client.base %>/bower_components/normalize.css/normalize.css',
                        '<%= config.client.base %>/bower_components/bootstrap/dist/css/bootstrap.css',
                        '<%= config.client.base %>/bower_components/fontawesome/css/font-awesome.css',
                        '<%= config.client.base %>/bower_components/highlightjs/styles/xcode.css',
                        '<%= config.client.styles %>/index.css',
                    ]
                }]
            },
            adminJs: {
                files: [{
                    dest: '<%= config.client.dist %>/.tmp/concat/js/admin.js',
                    src: [
                        '<%= config.client.base %>/bower_components/angular/angular.js',
                        '<%= config.client.base %>/bower_components/angular-ui-router/release/angular-ui-router.js',
                        '<%= config.client.base %>/bower_components/angular-resource/angular-resource.js',
                        '<%= config.client.base %>/bower_components/angular-animate/angular-animate.js',
                        '<%= config.client.base %>/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
                        '<%= config.client.base %>/bower_components/angular-file-upload/angular-file-upload.js',
                        '<%= config.client.base %>/bower_components/marked/lib/marked.js',
                        '<%= config.client.base %>/bower_components/highlightjs/highlight.pack.js',
                        '<%= config.client.base %>/bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
                        '<%= config.client.scripts %>/configs/AppConfig.js',
                        '<%= config.client.scripts %>/admin.js',
                        '<%= config.client.scripts %>/admin/AdminController.js',
                        '<%= config.client.scripts %>/utils/UtilsModule.js',
                        '<%= config.client.scripts %>/utils/NotificationService.js',
                        '<%= config.client.scripts %>/utils/MdhlDirective.js',
                        '<%= config.client.scripts %>/utils/ImgThumb.js',
                        '<%= config.client.scripts %>/resources/ResourceModule.js',
                        '<%= config.client.scripts %>/resources/Profile.js',
                        '<%= config.client.scripts %>/resources/Category.js',
                        '<%= config.client.scripts %>/resources/Post.js',
                        '<%= config.client.scripts %>/resources/Portfolio.js',
                        '<%= config.client.scripts %>/admin/auth/AuthModule.js',
                        '<%= config.client.scripts %>/admin/auth/AUTH_EVENTS.js',
                        '<%= config.client.scripts %>/admin/auth/AuthInterceptor.js',
                        '<%= config.client.scripts %>/admin/auth/AuthService.js',
                        '<%= config.client.scripts %>/admin/auth/AuthController.js',
                        '<%= config.client.scripts %>/admin/post/PostController.js',
                        '<%= config.client.scripts %>/admin/post/PostActionController.js',
                        '<%= config.client.scripts %>/admin/setting/SettingController.js',
                        '<%= config.client.scripts %>/admin/setting/SettingActionController.js',
                        '<%= config.client.scripts %>/admin/portfolio/PortfolioController.js',
                        '<%= config.client.scripts %>/admin/portfolio/PortfolioActionController.js'
                    ]
                }]
            },
            indexJs: {
                files: [{
                    dest: '<%= config.client.dist %>/.tmp/concat/js/index.js',
                    src: [
                        '<%= config.client.base %>/bower_components/angular/angular.js',
                        '<%= config.client.base %>/bower_components/angular-ui-router/release/angular-ui-router.js',
                        '<%= config.client.base %>/bower_components/angular-resource/angular-resource.js',
                        '<%= config.client.base %>/bower_components/angular-animate/angular-animate.js',
                        '<%= config.client.base %>/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
                        '<%= config.client.base %>/bower_components/marked/lib/marked.js',
                        '<%= config.client.base %>/bower_components/highlightjs/highlight.pack.js',
                        '<%= config.client.scripts %>/configs/AppConfig.js',
                        '<%= config.client.scripts %>/index.js',
                        '<%= config.client.scripts %>/utils/UtilsModule.js',
                        '<%= config.client.scripts %>/utils/NotificationService.js',
                        '<%= config.client.scripts %>/utils/MdhlDirective.js',
                        '<%= config.client.scripts %>/utils/DisqusDirective.js',
                        '<%= config.client.scripts %>/resources/ResourceModule.js',
                        '<%= config.client.scripts %>/resources/Profile.js',
                        '<%= config.client.scripts %>/resources/Category.js',
                        '<%= config.client.scripts %>/resources/Post.js',
                        '<%= config.client.scripts %>/resources/Portfolio.js',
                        '<%= config.client.scripts %>/content/ContentController.js',
                        '<%= config.client.scripts %>/content/blog/BlogController.js',
                        '<%= config.client.scripts %>/content/blog/BlogDetailController.js',
                        '<%= config.client.scripts %>/content/about/AboutController.js',
                        '<%= config.client.scripts %>/content/portfolio/PortfolioController.js'
                    ]
                }]
            }
        },
        uglify: {
            admin: {
                files: [{
                    dest: '<%= config.client.dist %>/scripts/admin.js',
                    src: ['<%= config.client.dist %>/.tmp/concat/js/admin.js']
                }]
            },
            index: {
                files: [{
                    dest: '<%= config.client.dist %>/scripts/index.js',
                    src: ['<%= config.client.dist %>/.tmp/concat/js/index.js']
                }]
            }
        },
        cssmin:{
            admin:{
                files:{
                    '<%= config.client.styles %>/build.css': ['<%= config.client.styles %>/.tmp/concat/css/build.css']
                }
            },
            app:{
                files:{
                    '<%= config.client.styles %>/build.css': ['<%= config.client.styles %>/.tmp/concat/css/build.css']
                }
            }
        },
        usemin:{
            html: ['<%= config.client.base %>/admin.html','<%= config.client.base %>/index.html']
        }




    });

    grunt.registerTask('app', 'grunt:app', function(target) {
        grunt.task.run([
            'connect:' + target,
            'watch'
        ]);
    });
    grunt.registerTask('build', 'grunt:build', function() {
        grunt.task.run([
            'useminPrepare',
            'concat:adminJs',
            'uglify:admin',
            'concat:indexJs',
            'uglify:index',
            'usemin'
        ]);
    });





};