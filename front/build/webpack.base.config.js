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
				use: ['vue-loader']
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
				// use: ['style-loader','css-loader','less-loader']
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
				test: /assets\/.*?\.(png|jpe?g|jpg|gif|svg)(\?.*)?$/,
				loader: 'base64-image-loader',
			},
			{
				test: /images\/.*?\.(png|jpe?g|jpg|gif|svg)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[hash].[ext]',
					publicPath: '../'
				}
			},
			{
				test: /\.(png|jpe?g|jpg|gif|svg)(\?.*)?$/,
				exclude: /(assets|images)\/.*?\.(png|jpe?g|jpg|gif|svg)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[hash].[ext]',
					publicPath: '../'
				}
			},
			{
				test: /.*?\.(woff2|woff|ttf|eot|svg|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[hash].[ext]',
					publicPath: '../'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
			'vuex$': 'vuex/dist/vuex.esm.js', // 'vue/dist/vue.common.js' for webpack 1
			//semantic: path.resolve(__dirname, '../libs/semantic-ui/src/'),
      // 'semantic': path.resolve(__dirname, '../../node_modules/semantic-ui-css/semantic.min.js')
      // jquery: path.resolve(__dirname, '../../node_modules/jquery/src/jquery')
		},
		extensions: ['.js', '.vue']
	},
	plugins: plugins.concat([
		new webpack.ProvidePlugin({
		      // jquery
		      $: 'jquery',
		      jQuery: 'jquery',
		      'window.jQuery': 'jquery',
      // semantic     : 'semantic-ui-css',
      // Semantic     : 'semantic-ui-css',
      // 'semantic-ui': 'semantic-ui-css'
		})
	])
};
