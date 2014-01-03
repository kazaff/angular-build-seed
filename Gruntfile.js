module.exports = function(grunt){

	grunt.initConfig({
		root: 'app/'
		, uglify: {
			js: {
				files: {
					'<%= root %>bootstrap.js': '<%= root %>bootstrap.min.js'
					, '<%= root %>config.js': '<%= root %>config.js'	
				}
			}
		}
		, htmlmin: {
			options: {
				removeComments: true
				, collapseWhitespace: true
			}
			, frame: {
				files: {
					"<%= root %>index.html": "<%= root %>index.html"
				}
			}
			, templates: {
				expand: true
				, cwd: "<%= root %>modules/"
				, src: ['**/*.html']
				, dest: "<%= root %>modules/"
			}
		}
		, cssmin: {
			minify: {
				expand: true
				, cwd: '<%= root %>css/'
				, src: ['*.css', '!main.css']
				, dest: '<%= root %>css/'	
			}
			, combine: {
				files: {
					'<%= root %>css/main.css': ['<%= root %>css/matrix-style.css', '<%= root %>css/matrix-media.css', '<%= root %>css/jquery.gritter.css', '<%= root %>css/matrix-media.css', '<%= root %>css/table-fixed-header.css', '<%= root %>css/font-awesome.css', '<%= root %>css/nprogress.css']
				}
			}
			
		}
		, requirejs: {
			compile:{
				options: {
					name: "bootstrap"
					, baseUrl: "<%= root %>"
					, mainConfigFile: "<%= root %>bootstrap.js"
					, out: "<%= root %>bootstrap.min.js"
					, optimize: "none"
					, useStrict: true
					, paths: {
						'angular/angular': 'empty:'
						, 'jquery/jquery': 'empty:'
						, 'lib/bootstrap': 'empty:'
						, 'jquery/jquery.gritter.min': 'empty:'
				        , 'jquery/table-fixed-header': 'empty:'
				        , 'jquery/jquery.ztree.all-3.5.min': 'empty:'
				        , 'angular/angular-resource': 'empty:'
				        , 'angular/angular-route': 'empty:'
				        , 'angular/angular-animate': 'empty:'
				        , 'angular/angular-strap': 'empty:'
				        , 'angular/bootstrap-datepicker': 'empty:'
				        , 'angular/bootstrap-datepicker.zh-CN': 'empty:'
				        , 'jquery/bootstrap-switch.min': 'empty:'
				        , 'angular/angular-sanitize.min': 'empty:'
				        , 'lib/console-min': 'empty:'
				        , 'lib/modernizr': 'empty:'
                        , 'jquery/nprogress': 'empty:'
					}					
				}
			}
		}
		, hashres: {
			options: {
				encoding: 'utf8'
				, fileNameFormat: '${name}.${hash}.${ext}'
				, renameFiles: true
			}
			, indexJS: {
				src: '<%= root %>bootstrap.js'
				, dest: '<%= root %>index.html'
			}
			, configJS: {
				src: '<%= root %>config.js'
				, dest: '<%= root %>login.html'
			}
			, mainCSS: {
				src: '<%= root %>css/main.css'
				, dest: '<%= root %>index.html'
			}
		}
		, clean: {
			js: {
				src: ['<%= root %>modules/**/controllers', '<%= root %>modules/**/services', '<%= root %>modules/**/init.js', '<%= root %>modules/**/route.js', '<%= root %>common', '<%= root %>bootstrap.min.js', '<%= root %>app.js', '<%= root %>utils']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-hashres');

	grunt.registerTask('default', ['requirejs','uglify', 'cssmin', 'htmlmin', 'hashres', 'clean']);
};