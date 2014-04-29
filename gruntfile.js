module.exports = function(grunt) {

  'use strict';

  var banner = function (alt) {
    var grunt = '<%=grunt.template.today("yyyy-mm-dd")%>', // get the current date
      version = ' - v<%=pkg.version%> - ', // get the version number from package.json
      name = '/*<%=pkg.name%>'; // get the name from package.json
    if (alt) {
      return name + ' - ' + alt + version + grunt + '*/';
    } else {
      return name + version + grunt + '*/';
    }
  };

  var hljs = require('highlight.js'),
      load = require('load-grunt-tasks');

  var options = {
    prod: './dist/production',
    dev: './dist/development',
    src: './src',
    plugins: './src/plugins',
    tpl: './tpl',
    pages: './pages',
    posts:  './posts',
    projects: './projects',
    vendor: './bower_components',
    expand: true,
    devPort: 8000,
    devHostname: 'localhost'
  },
  opt = options,
  devTarget = 'http://' + opt.devHostname + ':' + opt.devPort;    var site = grunt.config('site');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('src/data/site.yml'),
    vendor: grunt.file.readJSON('bower.json'),
    test: grunt.config.set('test'),

    /*
     * Remove all old files before creating the new files.
     */
    clean: { build: ['./dist'] },

    /*
    * Copy images and fonts to the build directories.
    */
    copy: {
      assets: {
        files: [
          {
            expand: opt.expand,
            cwd: opt.src + '/less/',
            src: ['fonts/**'],
            dest: opt.dev + '/assets/css'
          },
          {
            expand: opt.expand,
            cwd: opt.src + '/',
            src: ['img/**'],
            dest: opt.dev + '/assets/'
          },
          {
            expand: opt.expand,
            cwd: opt.src + '/',
            src: ['img/**'],
            dest: '<%=site.production%>/assets/'
          }
        ]
      }
    },

    /*
     * Compile LESS and lint using RECESS.
     */
    less: {
      options: {
        banner: banner(),
        compress: true,
        metadata: opt.src + '/less/data/*.{json,yml}'
      },
      assets: {
        files: {
          '<%=site.development%>/assets/css/portfolio.css' : opt.src + '/less/portfolio.less',
          '<%=site.development%>/assets/css/error.css' : opt.src + '/less/error.less',
          '<%=site.development%>/assets/css/soundcloud.css' : opt.src + '/less/pages/soundcloud.less'
        }
      },
      styles: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapFilename: opt.dev + '/assets/css/styles.css.map',
          sourceMapURL: opt.devTarget + '/assets/css/styles.css.map',
          sourceMapRootpath: opt.devTarget
        },
        files: {
          '<%=site.development%>/assets/css/styles.css' : opt.src + '/less/styles.less'
        }
      }
    },
    recess: {
      assets: { src: opt.src + '/*.less' }
    },

    /*
    * spell check all published content on blog
    */
    spell: {
      blog: {
        src: [opt.content],
        options: {
          lang: 'en',
          ignore: ['cliches']
        }
      }
    },

    /*
     * minify JS
     */
    uglify: {
      options: { banner: banner('Primary JS components') },
      assets: {
        files: {
          '<%=site.development%>/assets/js/components.js': [
            opt.src + '/js/lib/modules/currentLinkModule.js',
            //opt.vendor + '/responsive-nav/client/dist/responsive-nav.js',
            opt.vendor + '/headroom.js/dist/headroom.js',
            opt.src + '/js/vendor/echo.js',
            opt.vendor + '/fastclick/lib/fastclick.js'
          ],
          '<%=site.development%>/assets/js/highlight.js': opt.src + '/js/vendor/highlight.js',
          '<%=site.development%>/assets/js/hyphenate.js': opt.src + '/js/vendor/hyphenate.js'
        }
      },
      work: {
        options: { banner: banner('Work page JS components') },
        files: {
          '<%=site.development%>/assets/js/work.js': [
            opt.vendor + '/fit.js/fit.js',
            opt.vendor + '/pace/pace.js',
            opt.src + '/js/work/main.js'
          ],
          '<%=site.development%>/assets/js/skrollr.js': [
            opt.vendor + '/skrollr/src/skrollr.js',
            opt.vendor + '/skrollr-menu/src/skrollr.menu.js'
          ]
        }
      },
      ie: {
        options: { banner: banner('Provides IE 8 support') },
        files: {
          '<%=site.development%>/assets/js/ie.js': [
            opt.vendor + '/html5shiv/dist/html5shiv.js',
            opt.vendor + '/REM-unit-polyfill/js/rem.js',
            opt.vendor + '/respond/src/respond.js'
          ]
        }
      },
      soundcloudApp: {
        options: {
          mangle: false
        },
        files: {
          '<%=site.development%>/assets/js/soundcloud/app.js': [
            opt.src + '/js/soundcloud/app.js'
          ],
           '<%=site.development%>/assets/js/soundcloud/components.js': [
            //opt.src + '/js/soundcloud/jquery-2.0.2.min',
            opt.src + '/js/soundcloud/api.js',
            opt.src + '/js/soundcloud/player.js'
          ],
          '<%=site.development%>/assets/js/soundcloud/angular.js': [
            opt.vendor + '/angular/angular.js',
            opt.vendor + '/angular-route/angular-route.js',
            opt.vendor + '/angular-animate/angular-animate.js'
            //opt.vendor + '/angular-loading-bar/src/loading-bar.js'
          ]
        }
      }
    },

    /*
     * compress files
     */
    compress: {
      options: {
        mode: 'gzip',
        level: 9
      },
      stylesheets: {
        expand: true,
        cwd: '<%=site.development%>/assets/',
        dest: '<%=site.production%>/assets/',
        src: ['**/*.css'],
        ext: '.css'
      },
      javascripts: {
        expand: true,
        cwd: '<%=site.development%>/assets/',
        dest: '<%=site.production%>/assets/',
        src: ['**/*.js'],
        ext: '.js'
      },
      content: {
        expand: true,
        cwd: '<%=site.development%>/',
        dest: '<%=site.production%>/',
        src: ['**/*.html'],
        ext: '.html'
      },
      fonts: {
        expand: true,
        cwd: '<%=site.development%>/',
        src: ['assets/css/fonts/**/*'],
        dest: '<%=site.production%>/'
      }
    },

    /*
     * Assemble the site.
     */
    assemble: {
      options: {
        flatten: true,
        data: ['<%=site.source%>/data/*.{json,yml}', 'package.json'],
        plugins: [
          'assemble-contrib-permalinks',
          'assemble-contrib-sitemap',
          'assemble-contrib-rss',
          'assemble-contrib-wordcount',
          'assemble-related-pages'
        ],
        helpers: [
          'handlebars-helper-compose',
          'handlebars-helper-moment',
          opt.src + '/js/helpers/*.js'
        ],
        assets: '<%=site.development%>/assets',
        partials: [opt.tpl + '/partials/**/*.{hbs,md}', opt.tpl + '/snippets/**/*.{hbs,md}'],
        layoutdir: opt.tpl + '/layouts',
        layout: 'default.hbs',
        collections: [
          {
            name: 'post',
            sortby: 'date',
            sortorder: 'descending',
            pages: [opt.posts]
          }
        ],
        marked: {
          highlight: function (code, lang) {
            if (lang === undefined) lang = 'bash';
            if (lang === 'js') lang = 'javascript';
            if (lang === 'less') lang = 'scss';
            return hljs.highlight(lang, code).value;
          }
        },
        sitemap: {
          homepage: '<%=site.url%>',
          changefreq: 'daily',
          priority: '0.8',
          robot: true
        },
        permalinks: {
          structure: ':basename/index.html'
        },
        compose: {
          cwd: opt.posts
        }
      },

      pages: {
        files: [
          {
            src: opt.pages + '/*.{hbs,md}',
            dest: opt.dev + '/'
          }
        ]
      },

      posts: {
        options: {
          layout: 'layout-blog.hbs',
          permalinks: {
            structure: ':year/:basename/index.html'
          },
          feed: {
            debug: true,
            prettify: true,
            dest: 'rss.xml'
          },
          wordcount: { selector: '.article-content' }
        },
        files: [
          {
            src: opt.posts + '/**/*.{hbs,md}',
            dest: opt.dev + '/'
          },
          {
            src: opt.pages + '/index.hbs',
            dest: opt.dev + '/index.html'
          }
        ]
      },

      projects: {
        permalinks: {
          structure: ':year/:basename/index.html'
        },
        files: [
          {
            src: opt.projects + '/*.{hbs,md}',
            dest: opt.dev + '/'
          }
        ]
      },

      soundcloudApp: {
        files: [{
          src: opt.src + '/js/soundcloud/*.hbs',
          dest: opt.dev + '/soundcloud/'
        }]
      }

    },

    /*
     * assemble sitemap, humans.txt, and robots.txt
     */
    sitemap: {
      production: {
        siteRoot: opt.prod,
        homepage: '<%=pkg.url%>'
      }
    },
    humans_txt: {
      options: {
        commentStyle: 'u', // # Unix style comments
        content: grunt.file.readJSON('humans.txt.json')
      },
      production: {
        dest: opt.prod + '/humans.txt'
      }
    },
    robotstxt: {
      production: {
        dest: opt.prod,
        policy: [
          { ua: 'googlebot', disallow: '/assets/' },
          { sitemap: ['<%=site.url%>/sitemap.xml'] },
          { crawldelay: 100 },
          { host: '<%=site.url%>' }
        ]
      }
    },

    /*
    * Watch files for changes
    */
    watch: {
      dev: {
        files: [
          opt.src + '/**/*.{less,js,json,yml}',
          opt.tpl + '/**/*.{html,hbs,md}',
          opt.posts + '/**/*.{hbs,md}',
          opt.pages + '/**/*.{hbs,md}',
          opt.projects + '/**/*.{hbs,md}'
        ],
        tasks: ['less','uglify','assemble'],
        options: {
          spawn: false,
          interrupt: true,
          livereload: true
        }
      },
      css: {
        files: [
          opt.src + '/**/*.{less,js,json,yml}',
          opt.tpl + '/**/*.{html,hbs,md}',
          opt.posts + '/**/*.{hbs,md}',
          opt.pages + '/**/*.{hbs,md}',
          opt.projects + '/**/*.{hbs,md}'
        ],
        tasks: ['less'],
        options: {
          spawn: false,
          interrupt: true
        }
      }
    },


    /*
    * Start local server
    */
    connect: {
      dev: {
        options: {
          hostname: opt.devHostname,
          port: opt.devPort,
          open: {
            target: devTarget
          },
          base: opt.dev
        }
      }
    },

    /*
     * deploy to AWS S3
     */
    /*aws_s3: {
      options: {
        accessKeyId: '<%=aws.auth.key%>',
        secretAccessKey: '<%=aws.auth.secret%>',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      production: {
        options: {
          bucket: '<%=aws.bucket.production%>',
          params: {
            ContentEncoding: 'gzip'
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%=site.development%>',
            src: ['**'],
            dest: 'test/'
          },
          {
            expand: true,
            cwd: '<%=site.development%>/assets',
            src: ['**'],
            dest: 'test/assets/',
            params: {
              CacheControl: '2000'
            }
          },
        ]
      }
    },

    s3: {
      options: {
        key: '<%=aws.auth.key%>',
        secret: '<%=aws.auth.secret%>',
        access: 'public-read',
        gzip: true,
        gzipExclude: ['.jpg', '.png', '.gif'],
        headers: {
          // two week cache policy (1000 * 60 * 60 * 48)
          "Cache-Control": "max-age=172800000, public",
          "Content-Encoding": "gzip",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        }
      },

      // dev.pburtchaell.com bucket
      staging: {
        options: {
          encodePaths: true,
          bucket: '<%=aws.bucket.staging%>'
        },
        upload: [
          { src: '<%=site.development%>/', dest: './' }
        ]
      },

      // pburtchaell.com bucket
      production: {
        options: {
          bucket: '<%=aws.bucket.production%>'
        },
        upload: [
          { src: '<%=site.development%>/*.html', dest: 'aws-test/*.html'}
        ]
      }

    }*/

  });

  /*
  * plugins, such wow: https://www.npmjs.org/package/load-grunt-tasks
  */
  load(grunt, {
    pattern: '*',
    config: 'package.json',
    scope: 'devDependencies'
  });

  /*
   * tasks
   */
  grunt.registerTask('deploy-staging', ['s3:staging']); // deploy the site to the dev.pburtchaell.com bucket
  grunt.registerTask('deploy-production', ['s3:production']); // deploy the site to the pburtchaell.com bucket
  grunt.registerTask('default', ['assemble','connect:production']);
  grunt.registerTask('test', ['recess']);
  grunt.registerTask('dev', ['connect:dev','watch:dev']);
  grunt.registerTask('dev:css', ['connect:dev','watch:css']);
  grunt.registerTask('build', [
  /*
   * BUILD TASKS:
   *
   * 1. Clean ./dist directory
   * 2. Assemble HTML files to ./dist/development
   * 3. Compile minified stylesheets to .dist/development/assets/css
   * 4. Compile uglified scripts to ./dist/development/assets/js
   * 5. Copy font files to ./dist/development/assets/css/fonts
   * 6. Compress all files in assets/ and move to ./dist/production/assets
   * 7. Compress all HTML and move to ./dist/production
   * 8. Build sitemap, humans.txt, and robots.txt
   *
   * Files within the production folder will be compressed and ready to upload to the server.
   * Files within the development folder will not be compressed.
   *
   */
  'clean:build',
  'assemble',
  'less',
  'uglify',
  'copy:assets',
  'compress:stylesheets',
  'compress:javascripts',
  'compress:fonts',
  'compress:content',
  'humans_txt',
  'robotstxt'
  ]);
  grunt.task.registerTask('build2', function(env) {
    var env = env || 'development';
    grunt.config.set('site.url', (env === 'development') ? 'localhost:8000' : 'http://pburtchaell.com');
    grunt.task.run(
      'assemble'
    );
  });

}
