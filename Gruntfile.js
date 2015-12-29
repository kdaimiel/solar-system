/**
 * Gruntfile.js
 *
 */

module.exports = function(grunt) {
  // Load dev dependencies
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take for build time optimizations
  require('time-grunt')(grunt);

  // Configure the src path
  var base = 'src';
  var demo = 'demo';
  var src = [
    base + '/js/objects/SolarBody.js',
    base + '/**/*.js'
  ];

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
        src: src,
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
          open : {
            target: 'http://localhost:9000/', // target url to open
            callback: function() {} // called when the app has opened
          }
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        base + '/**/*.js',
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
          base + '/**/*.js',
          base + '/*.js',
          '<%= jshint.all %>',
          demo + '/*',
          'dist/*.js'
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
          '**/*.css',
          '**/*.html'
        ],
        tasks: ['build']
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      build: {
        src: src,
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
    },
    gitadd: {
      task: {
        options: {
          exclude: true,
          force: false
        },
        files: {
          src: [
            '.'
          ]
        }
      }
    },
    'npm-publish': {
      options: {
        // list of tasks that are required before publishing
        requires: ['build'],
        // if the workspace is dirty, abort publishing (to avoid publishing local changes)
        abortIfDirty: false
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
    'build',
    'gitadd',
    'bump-commit',
    'npm-publish',
    'bump-only'
  ]);

  grunt.registerTask('default', ['test', 'serve']);

  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');

};
