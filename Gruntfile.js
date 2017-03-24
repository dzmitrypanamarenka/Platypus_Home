module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);


    grunt.initConfig({
        less: {
            style: {
                files: {
                    "dist/css/style.css": "src/less/style.less"
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
                files: ["src/less/**/*.less"],
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
                prefix: 'icon-svg-',
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
            },
            fonts: {
                expand: true,
                cwd: 'src/fonts/',
                src: ['*.{woff,woff2}'],
                dest: 'dist/fonts/'
            }
        },
        clean: {
            build: ['dist']
        }
    });

    grunt.registerTask("symbols", ["svgmin", "svgstore",'svgi']);
    grunt.registerTask("serve", ["browserSync", "watch"]);
    grunt.registerTask('svgi', 'Transform SVG sprites to JS file',
        function () {
            var svg = [], content;

            content = grunt.file.read('dist/img/symbols.svg');
            content = content.replace(/'/g, "\\'");
            content = content.replace(/>\s+</g, "><").trim();
            svg.push("'" + content + "'");
            grunt.file.write('dist/js/svg-sprite.js',
                '(function() {var SVG_SPRITE = ' + svg.join('+\n') +
                '; var svgDiv = document.createElement("div"); svgDiv.innerHTML = SVG_SPRITE; svgDiv.className = "svg-sprite"; document.body.insertBefore(svgDiv, document.body.firstChild);})();');
        });

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