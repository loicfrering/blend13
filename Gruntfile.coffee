module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    less:
      compile:
        files: [
          expand: true
          cwd:    'less/'
          src:    '*.less'
          dest:   'css/'
          ext:    '.css'
        ]
    watch:
      less:
        files: 'less/*.less'
        tasks: 'less'
  )

  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  # Default task(s).
  grunt.registerTask('default', 'less')
