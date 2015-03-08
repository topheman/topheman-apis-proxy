'use strict';

module.exports = function(grunt){
  
  require('load-grunt-tasks')(grunt);
  
  try{
    var localEnv = require('./config/local.env');
  }
  catch(e){
    if(process.argv.indexOf('init') === -1){
      grunt.fail.warn("Plean run \"grunt init\" before any task, this will create your config/local.js file");
    }
  }
  
  grunt.initConfig({

    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'bin/www'
        }
      },
      prod: {
        options: {
          script: 'dist/bin/www'
        }
      }
    },
    
    env: {
      prod: {
        NODE_ENV: 'production',
        DEBUG: 'http'
      },
      dev: {
        NODE_ENV: 'development',
        DEBUG: 'http,errors'
      },
      test: {
        NODE_ENV: 'test',
        DEBUG: 'http,errors'
      },
      all: localEnv
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      debug: {
        tasks: [
          'nodemon'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'bin/www',
        options: {
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          }
        }
      }
    },
    
    // Copies remaining files to places other tasks can use
    copy: {
      localEnv: {
        src: 'config/local.env.default.js',
        dest: 'config/local.env.js'
      }
    },
    
    // add test task to match npm tasks
    run: {
      test: {
        cmd: "npm",
        args: ['test']
      }
    }
    
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });
  
  grunt.registerTask('serve', function (target) {

    if (target === 'debug') {
      return grunt.task.run([
        'env:all',
        'env:dev',
        'concurrent:debug'
      ]);
    }
    
    if (target === 'test') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'express:dev',
        'express-keepalive'
      ]);
    }
    
    if (target === 'test-debug') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'concurrent:debug'
      ]);
    }
    
    if (target === 'prod') {
      return grunt.task.run([
        'env:all',
        'env:prod',
        'express:dev',
        'express-keepalive'
      ]);
    }

    grunt.task.run([
      'env:all',
      'env:dev',
      'express:dev',
      'express-keepalive'
    ]);
  });
  
  grunt.registerTask('init', [
    'copy:localEnv'
  ]);
  
  grunt.registerTask('test',['run:test']);
  
};