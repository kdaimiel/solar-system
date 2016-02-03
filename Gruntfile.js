/**
 * Gruntfile.js
 * @Description Solar System with Threejs
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

module.exports = function(grunt) {
  // Load dev dependencies
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take for build time optimizations
  require('time-grunt')(grunt);

  // Configure properties
  /*var src = [
    'src/js/objects/SolarBody.js',
    'src/js/objects/PlanetMesh.js',
    'src'
  ];*/
  var src = 'src';
  var test = 'test';
  var dist = 'dist';
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
      dist: dist
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open : {
            target: 'http://localhost:9000/',
            callback: function() {}
          }
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        src + '/**/*.js',
        test + '/**/*.js',
        demo + '/**/*.js',
        '*.js'
      ]
    },
    jsonlint: {
      pkg: [ 'package.json' ],
      bower: [ 'bower.json' ],
      files: [ src + '/**/*.json']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint']
      },
      json: {
        files: [
          '<%= jsonlint.files %>',
          '{package,bower}.json'
        ],
        tasks: ['jsonlint']
      },
      reload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= watch.js.files %>',
          '<%= watch.json.files %>',
          '<%= jshint.options.jshintrc %>',
          '**/*.css',
          '**/*.html'
        ],
        tasks: ['build']
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>\n',
        stripBanners: true
      },
      dist: {
        src: [
          'src/js/objects/SolarBody.js',
          'src/js/objects/PlanetMesh.js',
          src + '/**/*.js'
        ],
        dest: dist + '/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      build: {
        src: [
          'src/js/objects/SolarBody.js',
          'src/js/objects/PlanetMesh.js',
          src + '/**/*.js'
        ],
        dest: dist + '/<%= pkg.name %>.min.js'
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
    gitcommit: {
      task: {
        options: {
          message: '<%= pkg.description %>',
          allowEmpty: true
        },
        files: {
          src: [
            '.'
          ]
        }
      }
    },
    gitpush: {
      task: {
        options: {
          branch: 'master',
          remote: '<%= pkg.repository %>',
          upstream: true
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
        requires: ['build'],
        abortIfDirty: false
      }
    }
  });

  // Register custom tasks
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
    'uglify',
  ]);

  grunt.registerTask('test', [
    'newer:jsonlint',
    'newer:jshint',
    'karma:unit'
  ]);

  grunt.registerTask('commit', [
    'build',
    'gitadd',
    'gitcommit',
    'bump-only'
  ]);

  grunt.registerTask('release', [
    'build',
    'commit',
    'gitpush'
  ]);

  // Register default task
  grunt.registerTask('default', ['build', 'serve']);

  // Load external grunt tasks
  grunt.loadNpmTasks('grunt-cordovacli');
  grunt.loadNpmTasks('grunt-npm');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-karma');

};
