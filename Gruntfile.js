module.exports = function(grunt) {
	// Load plugins
	grunt.loadNpmTasks('grunt-plato');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-lesslint');
	
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
					"css/cv.css" : "less/cv.less" // destination file and source file
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
	grunt.registerTask('default',  ['less']);
	grunt.registerTask('analysis', ['plato', 'jshint', 'lesslint']);
};