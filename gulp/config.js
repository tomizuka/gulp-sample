var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var dest = './dist',
    app  = './app';

module.exports = {
  dest: dest,

  copy: {
    src: [
      app + '/**/*.html'
    ],
    dest: dest
  },

  sass: {
    src: [
      app + '/assets/sass/*.scss',
      app + '/assets/sass/**/*.scss',
    ],
    dest: dest + '/assets/css'
  },

  js: {
    app: app + '/assets/js/**',
    dest: dest + '/assets/js',
    uglify: true
  },

  webpack: {
    entry: {
      app: app + '/assets/js/app.js',
      /*
      index: app + '/assets/js/index.js',
      detail: app + '/assets/js/detail.js'
      */
    },
    output: {
      filename: '[name].js'
    },
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules', 'bower_components'],
      alias: {}
    },
    plugins:[
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      }),
      new webpack.optimize.CommonsChunkPlugin('app', 'app.js')
    ],
    module: {
      // webpackでBabelをコンパイル
      loaders: [
        //{
        //  test: /\.jquery.js$/,
        //  loader: 'expose?jQuery'
        //},
        {
          test: /.css$/,
          loader: 'style!css'
        },
        {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'},
        {test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff'},
        {test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff'},
        {test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff'},
        {test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff'},
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            compact: false
          }
        }
      ]
    }
  },

  watch: {
    js: [app + '/assets/js/**'],
    sass: [app + '/assets/sass/*.scss', app + '/assets/sass/**/*.scss'],
    copy: [app + '/*.html', app + '/**/*.html']
  }
}
