var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entry = {
	commons: ['jquery'],//, 'vue', 'vue-router', 'vuex'
};
var plugins = [];
var files = glob.sync(__dirname + '/../pages/*/*.html');
files.forEach(function(file) {
	var folder = path.dirname(file);
	var dirs = path.parse(file).dir.split(path.sep);
	var moduleName = dirs.length > 0 ? dirs[dirs.length - 1] : 'home';
	var entryName = path.basename(file, '.html');
	var entryPath = './front/pages/' + moduleName + '/' + entryName + '.js';
	entry[entryName] = entryPath;
	plugins.push(new HtmlWebpackPlugin({
		filename: '../../view/' + moduleName + '/' + entryName + '/' + entryName + '.html',
		template: file,
		chunks: ['vendor', entryName],
		inject: true,
		minify: false,
	}));
});

module.exports = {
	entry: entry,
	module: {
		rules: [
			// {
      //     test: require.resolve('jquery'),
      //     use: [{
      //         loader: 'expose-loader',
      //         options: 'jQuery'
      //     },{
      //         loader: 'expose-loader',
      //         options: '$'
      //     }]
      // },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				// query: {
				// 	presets: ['es2015']
				// }
			},
			{
				test: /\.vue$/,
				use: ['vue-loader'],
				// loader: 'vue',
				// options: {
				// 	loaders: {
				// 		css: ExtractTextPlugin.extract("css"),
				// 		less: ExtractTextPlugin.extract("css!less")
				// 	}
				// }
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
				//use: ['css-loader','style-loader']
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: "css-loader!less-loader"
	        	})
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /assets\/.*?\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'base64-image-loader',
			},
			{
				test: /images\/.*?\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file',
				query: {
					name: 'images/[name].[hash].[ext]',
					publicPath: ''
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				exclude: /(assets|images)\/.*?\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file',
				query: {
					name: 'images/[name].[hash].[ext]',
					publicPath: '../'
				}
			},
			{
				test: /.*?\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file',
				query: {
					name: 'fonts/[name].[hash].[ext]',
					publicPath: '../'
				}
			}
		]
	},
	// vue: {
	// 	loaders: {
	// 		css: ExtractTextPlugin.extract("css"),
	// 		less: ExtractTextPlugin.extract("css!less")
	// 	}
  	// },
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
			'vuex$': 'vuex/dist/vuex.esm.js', // 'vue/dist/vue.common.js' for webpack 1
      // jquery: path.resolve(__dirname, '../../node_modules/jquery/src/jquery')
		},
		extensions: ['.js', '.vue']
	},
	plugins: plugins.concat([
		new webpack.ProvidePlugin({
		      // jquery
		      $: 'jquery',
		      jQuery: 'jquery',
		      'window.jQuery': 'jquery'
		})
	])
};
