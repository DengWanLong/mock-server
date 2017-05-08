var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var baseWebpackConfig = require('./webpack.base.config');
// var fse = require('fs-extra');
var path = require('path');

const staticPath = path.resolve(__dirname, '../../www/static');
// fse.removeSync(__dirname + '/../dist');

module.exports = merge(baseWebpackConfig, {
	output: {
		path: staticPath,
		publicPath: '/static/',
		filename: 'js/[name].[chunkhash].js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/[name].[chunkhash].js'}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin('css/[name].[contenthash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			},
			DEV: false,
			TEST: false
	  }),
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
			sourceMap: false
    }),
	]
});
