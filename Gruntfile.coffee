module.exports = (grunt) ->

    grunt.task.loadNpmTasks 'grunt-contrib-coffee'
    grunt.task.loadNpmTasks 'grunt-contrib-watch'
    grunt.task.loadNpmTasks 'grunt-coffeelint'
    grunt.task.loadNpmTasks 'grunt-mocha-test'

    grunt.initConfig
        pkg:
            grunt.file.readJSON('package.json')

        coffee:
          dist:
            src: ['RestrictedNumber.coffee']
            dest: 'RestrictedNumber.js'

        coffeelint:
          dist:
            files:
              src: ['RestrictedNumber.coffee']

          options:
            no_tabs:
              level: 'ignore'
            indentation:
              level: 'ignore'

        watch:
            dist:
                files: '*.coffee'
                tasks: [ 'coffeelint', 'coffee:dist', 'mochaTest:dist' ]

        mochaTest:
            dist:
                options:
                    ui: 'bdd'
                    reporter: 'spec'
                src:
                    'RestrictedNumberTest.coffee'

    grunt.event.on 'coffee.error', (msg) ->
        grunt.log.write msg

    grunt.registerTask 'test', ['coffeelint', 'coffee', 'mochaTest']
    grunt.registerTask 'default', ['coffeelint', 'coffee', 'mochaTest']
    grunt.registerTask 'dev', ['watch']
