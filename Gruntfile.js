/**
 * Gruntfile.js
 *
 * Copyright (c) 2012 quickcue
 */

module.exports = function(grunt) {
  // Load dev dependencies
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take for build time optimizations
  require('time-grunt')(grunt);

  // Configure the src path
  var base = 'src';
  var demo = 'demo';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*\n' +
        ' * <%= pkg.name %>\n' +
        ' * @Description <%= pkg.description %>\n' +
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * @link <%= pkg.homepage %>\n' +
        ' * @author <%= pkg.author %>\n' +
        ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
        ' */',
    },
    // The actual grunt server settings
    clean: {
      dist: ['dist/*js']
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>\n',
        stripBanners: true
      },
      dist: {
        src: base + '/js/*.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        base + '/js/*.js',
        '*.js'
      ]
    },
    jsonlint: {
      pkg: [ 'package.json' ],
      bower: [ '{bower}.json' ],
      files: [ base + '/data/*.json']
    },
    watch: {
      // Watch javascript files for linting
      js: {
        files: [
          '<%= jshint.all %>',
          demo + '/*'
        ],
        tasks: ['jshint']
      },
      json: {
        files: [
          base + '/data/*.json',
          '{package,bower}.json'
        ],
        tasks: ['jsonlint']
      },
      // Live reload
      reload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= watch.js.files %>',
          '<%= watch.json.files %>',
          base + '/css/**/*.css',
          '**/*.html'
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      build: {
        src: base + '/js/*.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitMessage: 'Web Solar System with Three.js : bump v<%= pkg.version %>',
        tagName: 'v<%= pkg.version %>',
        tagMessage: 'Web Solar System with Three.js : bump v<%= pkg.version %>',
        commitFiles: ['-a'],
        pushTo: '<%= pkg.repository %>'
      }
    }
  });

  grunt.registerTask('serve', function () {
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'test',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'newer:jsonlint',
    'newer:jshint'
  ]);

  grunt.registerTask('release', [
    'test',
    'bump-only',
    'build',
    'bump-commit'
  ]);

  grunt.registerTask('default', ['test', 'serve']);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');


};
