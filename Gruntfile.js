module.exports = function(grunt) {
  // Load plugins
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsonlint');

  // Configuration
  grunt.initConfig({
    less : {
      development : {
        options : {
          compress : true,
          yuicompress : true,
          optimization : 2
        },
        files : {
          "work/layout.css" : "less/layout.less", // destination file and source file
          "work/print.css" : "less/print.less"
        }
      }
    },
    concat_css : {
      options : {
        // Task-specific options go here.
      },
      all : {
        src : ["node_modules/purecss/build/pure-min.css", "work/layout.css", "work/print.css"],
        dest : "dist/cv.css"
      },
    },
    handlebars : {
      compile : {
        options : {
          namespace : "tmpl",
          processName : function(filePath) {
            var name = filePath.replace('tmpl/', '').replace('.html', '');
            return name.toLowerCase();
          }
        },
        files : {
          "work/cv-tmpl.js" : "tmpl/cv.html",
          "work/header.js" : "tmpl/header.html"
        }
      }
    },
    uglify : {
      dist : {
        files : {
          'dist/cv.min.js' : ['node_modules/underscore/underscore.js',
                              'node_modules/jquery/dist/jquery.js',
                              'node_modules/handlebars/dist/handlebars.runtime.js',
                              'work/cv-tmpl.js',
                              'work/header.js',
                              'js/cv.js']
        }
      }
    },
    copy: {
      main: {
        src: 'assets/**',
        dest: 'dist/'
      },
    },
    /* Analysis */
    jshint : {
      all : ['Gruntfile.js', 'js/cv.js']
    },
    jsonlint: {
      sample: {
        src: ['assets/data/**/*.json']
      }
    },
    lesslint : {
      analysis : {
        options : {
          csslint : {
            csslintrc : '.csslintrc'
          }
        },
        src : ['less/*.less']
      }
    },
    plato : {
      analysis : {
        files : {
          'reports' : ['js/*.js']
        },
        options : {
          exclude : /\.min\.js$/
        }
      }
    }
  });

  // Tasks
  grunt.registerTask('default', ['handlebars', 'uglify', 'less', 'concat_css', 'copy']);
  grunt.registerTask('analysis', ['plato', 'jshint', 'jsonlint', 'lesslint']);
};