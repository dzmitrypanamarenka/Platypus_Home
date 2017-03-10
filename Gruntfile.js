module.exports = function (grunt) {
    // grunt.loadNpmTasks("grunt-contrib-less");
    // // grunt.loadNpmTasks("grunt-postcss");
    // // grunt.loadNpmTasks("grunt-contrib-watch");
    // // // grunt.loadNpmTasks("grunt-browser-sync");
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
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
            html: {
                files: ["*.html"],
                tasks: ["copy:html"]
            },
            style: {
                files: ["src/css/**/*.less","src/css/**/*.css"],
                tasks: ["less","postcss", "csso"]
            }
        },
        browserSync: {
            server: {
                bsFiles: {
                    src: ["dist/*.html", "dist/css/*.css"]
                },
                options: {
                    server: "dist",
                    watchTask: true
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3
                },
                dynamic: {
                    files: [{
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/img'
                    }]
                }
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
            build: {
                files: [{
                    expand: true,
                    src: [
                        "css/*.css"
                    ],
                    dest: "dist/css"
                }]
            },
            html: {
                files: [{
                    expand: true,
                    src: ["src/*.html"],
                    dest: "dist/pages"
                }]
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

};