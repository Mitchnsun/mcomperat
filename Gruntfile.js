module.exports = function(grunt) {
	require('jit-grunt')(grunt);
	
	// Load plugins
	grunt.loadNpmTasks('grunt-plato');

	// Configuration
	grunt.initConfig({
		plato : {
			analysis : {
				files : {
					'reports' : ['js/*.js']
				},
				options : {
					exclude: /\.min\.js$/
				}
			}
		},
		less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/cv.css": "less/cv.less" // destination file and source file
        }
      }
    },
	});
	
	// Tasks
	grunt.registerTask('default', ['less']);
	grunt.registerTask('analysis', ['plato']);
}; 