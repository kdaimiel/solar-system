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
  var src = 'src';
  var test = 'test';
  var dist = 'dist';

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
        '*.js'
      ]
    },
    jsonlint: {
      pkg: [ 'package.json' ],
      bower: [ 'bower.json' ],
      files: [
        src + '/**/*.json',
        '*.json'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
      }
    },
    watch: {
      reload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= jshint.all %>',
          '<%= jsonlint.files %>',
          '<%= jshint.options.jshintrc %>',
          '**/*.jsx',
          '**/*.css',
          '**/*.html',
          src + '/polymer/*'
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
    gittag: {
      addtag: {
        options: {
          tag:'v<%= pkg.version %>',
          message: '<%= pkg.description %>'
        }
      }
    },
    gitpush: {
      task: {
        options: {
          branch: 'master',
          remote: '<%= pkg.repository %>',
          upstream: true,
          tags: true
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
    },
    /* Polymer Tasks*/
    'wct-test': {
      local: {
        options: {remote: false},
      }
    },
    copy: {
      'polymer': {
        expand: true,
        cwd: src + '/polymer',
        src: '**',
        dest: dist,
        flatten: true
      }
    },
    /* React Task*/
    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        presets: ['es2015', 'react']
      },
      jsx: {
        files: [{
          expand: true,
          src: src + '/jsx/*.jsx',
          dest: dist,
          flatten: true,
          ext: '.js'
        }]
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
    'build-polymer',
    'build-react'
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
    'commit',
    'gittag',
    'gitpush',
    'npm-publish'
  ]);

  grunt.registerTask('build-polymer', [
    'wct-test',
    'copy:polymer'
  ]);

  grunt.registerTask('build-react', [
    'babel:jsx'
  ]);

  // Register default task
  grunt.registerTask('default', ['build', 'serve']);

  // Load external grunt tasks
  grunt.loadNpmTasks('grunt-npm');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('web-component-tester');
  grunt.loadNpmTasks('grunt-contrib-copy');

};
