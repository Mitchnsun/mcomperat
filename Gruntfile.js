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
          "work/layout.css" : "less/layout.less" // destination file and source file
        }
      }
    },
    concat_css : {
      options : {
        // Task-specific options go here.
      },
      all : {
        src : ["bower_components/pure/pure-min.css", "work/layout.css"],
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
          "work/tmpl.js" : "tmpl/cv.html"
        }
      }
    },
    uglify : {
      dist : {
        files : {
          'dist/cv.min.js' : ['bower_components/jquery/dist/jquery.min.js',
                              'bower_components/handlebars/handlebars.runtime.js',
                              'work/tmpl.js',
                              'js/cv.js']
        }
      }
    },
    copy: {
      main: {
        src: 'assets/*',
        dest: 'dist/'
      },
    },
    /* Analysis */
    jshint : {
      all : ['Gruntfile.js', 'js/cv.js']
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
  grunt.registerTask('analysis', ['plato', 'jshint', 'lesslint']);
};