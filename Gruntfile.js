module.exports = function(grunt) {
    'use strict';
    var ejs = require('ejs');
    var cheerio = require('cheerio');

    // register buildPage task
    grunt.task.registerTask('buildPage', 'a task to build page', function () {
        var paths = grunt.file.expand([
            '**/*.html',
            '!node_modules/**/*.html',
            '!templates/**/*.html',
            '!deploy/**/*.html'
        ]);

        paths.forEach(function (item, index) {
            try {
                var str = grunt.file.read(item);
                var exec = /<config>([\w\W]+)<\/config>/gmi.exec(str);
                var config = JSON.parse(exec[1]);
                config.keywords = config.keywords || config.title;
                config.description = config.description || config.title;

                // adjust dir level
                var dirLevel = item.match(/\//g).length;
                var chdir = '';
                while(dirLevel > 0) {
                    chdir += '../';
                    dirLevel--;
                }
                config.chdir = chdir;

                str = str.replace(exec[0], '');
                var content = str.trim();
                var header = grunt.file.read('templates/header.html');
                var footer = grunt.file.read('templates/footer.html');
                var html = (header + content + footer).trim();
                var res = ejs.render(html, config);

                // move link/style tag to head
                var $ = cheerio.load(res, {decodeEntities: false, recognizeSelfClosing: false});
                var style = $('body link, body style');
                var head = $('head');
                style.each(function (index, item) {
                    head.append(item);
                });

                // move script tag to bottom
                var script = $('.container script');
                var cnzz = $('#cnzz');
                script.each(function (index, item) {
                    cnzz.before(item);
                });
                grunt.file.write('deploy/' + item, $.html());
                grunt.log.ok('build deploy/' + item);
            } catch (e) {
                // no config info, jump build
                grunt.log.error('jump deploy/' + item);
            }
        });    
    });


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            main: {
                src: 'deploy'
            }
        },

        copy: {
            all: {
                files: [
                    {
                        src: ['**/*', '!node_modules/**', '!templates/**', '!Gruntfile.js', '!package.json'],
                        dest: 'deploy/'
                    }
                ]
            },
            static: {
                files: [
                    {
                        src: ['static/**/*'],
                        dest: 'deploy/'
                    }
                ]
            }
        },

        compass: {
            main: {
                options: {
                    basePath: 'static/',
                    sassDir: 'sass',
                    cssDir: 'css',
                    imagesDir: 'img',
                    javascriptsDir: 'js',
                    outputStyle: 'compressed',
                    force: true,
                    relativeAssets: true,
                    noLineComments: true,
                    assetCacheBuster: false
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: 'localhost',
                    base: 'deploy'
                }
            }
        },

        watch: {
            html: {
                files: ['**/*.html', '!node_modules/**', '!deploy/**'],
                tasks: ['buildPage']
            },
            sass: {
                files: ['static/**/*.scss'],
                tasks: ['compass', 'copy:static']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['clean', 'copy:all', 'buildPage']);
    grunt.registerTask('server', ['default', 'connect', 'watch']);
};