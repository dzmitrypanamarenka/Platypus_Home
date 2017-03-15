module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);


    grunt.initConfig({
        less: {
            style: {
                files: {
                    "dist/css/style.css": "src/css/style.less"
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({browsers: [
                        "last 1 version",
                        "last 2 Chrome versions",
                        "last 2 Firefox versions",
                        "last 2 Opera versions",
                        "last 2 Edge versions"
                    ]})
                ]
            },
            style: {
                src: "dist/css/*.css"
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ["src/*.html"],
                tasks: ["copy:main"]
            },
            style: {
                files: ["src/css/**/*.less"],
                tasks: ["less"]
            }
        },
        browserSync: {
            server: {
                bsFiles: {
                    src: ["dist/*.html", "dist/css/*.css"]
                },
                options: {
                    server: {
                        baseDir: "dist"
                    },
                    watchTask: true,
                    notify: false
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['img/**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        csscomb: {
            foo: {
                files: {
                    'dist/css/style.css': ['dist/css/style.css']
                }
            }
        },
        csso: {
            compress: {
                options: {
                    report: 'gzip'
                },
                files: {
                    'dist/css/style.min.css': ['dist/css/style.css']
                }
            }
        },
        svgstore: {
            options: {
                svg: {
                    style: "display: none"
                }
            },
            symbols: {
                files: {
                    "dist/img/symbols.svg": ["src/img/icons/*.svg"]
                }
            }
        },
        svgmin: {
            symbols: {
                files: [{
                    expand: true,
                    src: ["src/img/icons/*.svg"]
                }]
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: ['*.html'],
                dest: 'dist/'
            }
        },
        clean: {
            build: ["dist"]
        }
    });

    grunt.registerTask("symbols", ["svgmin", "svgstore"]);
    grunt.registerTask("serve", ["browserSync", "watch"]);

    grunt.registerTask("go", [
        "clean",
        "copy",
        "less",
        "postcss",
        "csscomb",
        "csso",
        "symbols",
        "imagemin"
    ]);
    grunt.registerTask("start", ["go","serve"]);

};