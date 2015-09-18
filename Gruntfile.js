module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'public'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js', 'js/{*, utils/*, **}.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'js',
          mainConfigFile: 'js/app.js',
          name: 'app',
          out: 'public/scripts.js'
        }
      }
    },
    watch: {
      files: ['index.html', '<%= jshint.files %>', 'scss/{**,*}.scss'],
      tasks: ['jshint', 'compass', 'requirejs'],
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['watch']);

};