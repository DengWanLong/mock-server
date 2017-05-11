var fs = require('fs');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var baseWebpackConfig = require('./webpack.base.config');
var path = require('path');
var glob = require('glob');

const staticPath = path.resolve(__dirname, '../../dist');
const hosts = {
	local: 'http://127.0.0.1:8360',
	online: 'https://211.144.24.50/',
	test: 'http://192.168.172.53:9099/',
};

var plugins = [];
var files = glob.sync(__dirname + '/../pages/*/*.html');
files.forEach(function(file) {
	var dirs = path.parse(file).dir.split(path.sep);
	var moduleName = dirs.length > 0 ? dirs[dirs.length - 1] : 'home';
	var entryName = path.basename(file, '.html');
	var entryPath = './front/pages/' + moduleName + '/' + entryName + '.js';
	plugins.push(new HtmlWebpackPlugin({
		filename: moduleName + '/' + entryName + '/' + entryName + '.html',
		template: file,
		chunks: ['vendor', entryName],
		inject: true,
		minify: false,
	}));
});

module.exports = merge(baseWebpackConfig, {
	output: {
		path: staticPath,
		filename: 'js/[name].[chunkhash].js'
	},
	plugins: (plugins|| []).concat([
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/[name].js'}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin('css/[name].css'),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			},
			DEV: true,
			TEST: true
	  	}),
		new DashboardPlugin()
	]),
	devServer: {
		//contentBase: staticPath,
		host: '127.0.0.1',
		port: 80,
		hot: true,
		inline: true,
		index: 'home/index/index.html',
    	proxy: {
			// '/api/djgw/**': {
			// 	target: hosts.test,
			// 	secure: false,
			// 	pathRewrite: {
			// 		'^/api': ''
			// 	}
			// },
			'/api/**': {
				target: hosts.local,
				secure: false
			},
			'/login/**': {
				target: hosts.local,
				secure: false
			},
			'/home/**': {
				target: hosts.local,
				secure: false
			}
			//,
			// '/h5/**': {
			// 	target: 'https://127.0.0.1/',
			// 	secure: false,
			// 	pathRewrite: function(path) {
			// 		return path.replace(/^\/h5/, '').replace('index.html', 'task.html');
			// 	}
			// }
		}
	}
	// ,
	// dev: {
	// 	env: 'development',
	// 	port: 8360,
	// 	autoOpenBrowser: true,
	// 	assetsSubDirectory: 'static',
	// 	assetsPublicPath: '/',
	// 	proxyTable: {},
	// 	// CSS Sourcemaps off by default because relative paths are "buggy"
	// 	// with this option, according to the CSS-Loader README
	// 	// (https://github.com/webpack/css-loader#sourcemaps)
	// 	// In our experience, they generally work as expected,
	// 	// just be aware of this issue when enabling this option.
	// 	cssSourceMap: false
	// }
});
