module.exports = function(grunt) {
	// Load plugins
	grunt.loadNpmTasks('grunt-plato');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-lesslint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Configuration
	grunt.initConfig({
		plato : {
			analysis : {
				files : {
					'reports' : ['js/*.js']
				},
				options : {
					exclude : /\.min\.js$/
				}
			}
		},
		less : {
			development : {
				options : {
					compress : true,
					yuicompress : true,
					optimization : 2
				},
				files : {
					"css/layout.css" : "less/layout.less" // destination file and source file
				}
			}
		},
		concat_css: {
      options: {
        // Task-specific options go here. 
      },
      all: {
        src: ["bower_components/pure/pure-min.css", "css/layout.css"],
        dest: "dist/cv.css"
      },
    },
    uglify: {
      dist: {
        files: {
          'dist/cv.min.js': ['bower_components/jquery/dist/jquery.min.js', 'js/cv.js']
        }
      }
    },
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
		}
	});

	// Tasks
	grunt.registerTask('default',  ['less', 'uglify', 'concat_css']);
	grunt.registerTask('analysis', ['plato', 'jshint', 'lesslint']);
};