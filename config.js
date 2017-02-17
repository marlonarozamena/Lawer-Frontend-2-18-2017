var source = './src/',
    dest = './dist/',
    nodemodules = './node_modules/',
    bowercomponents = './bower_components',
    bootstrapSass = bowercomponents + 'bootstrap-sass/';
module.exports = {
    jadeConfig: {
        path: {
            in: source + 'jade/**/*.jade',
            out: './'
        }
    },
    scssConfig: {
        path: {
            in: source + 'sass/**/*.scss',
            out: source + 'css',
            map: '../maps',
            watch: source + 'sass/**/*',
        },
        options: {
            precison: 3,
            errLogToConsole: true,
            includePaths: [bootstrapSass + 'assets/stylesheets',bowercomponents + 'font-awesome/css' ]
        }
    },
    holderjs: {
        path: {
            in: bowercomponents + 'holderjs/',
            out: source + 'js'
        }
    },
    typescriptConfig: {
        path: {
            in: source + 'typescript/**/*.ts',
            out: source + 'js'
        }
    },
    fonts: {
        path: {
            in: [source + 'fonts/*.*', bootstrapSass + 'assets/fonts/**/*', bowercomponents + 'font-awesome/fonts/**/*'],
            out: source + 'fonts/'
        }
    },
    dist: {
        cssFiles: './dist/css/*.css',
        cssPath: {
            in: './src/css/**/*.css',
            out: './dist/css'
        }
    }

}
