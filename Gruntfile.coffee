module.exports = (grunt)->
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-wiredep'
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json'),
    coffee:
      compile:
        files:
          'jquery.honey.pagination.js': 'src/jquery.honey.pagination.coffee'
    wiredep:
      options:
        devDependencies: false
      target:
        src: ['index.html']
  )

  grunt.registerTask 'default', ['coffee', 'wiredep']