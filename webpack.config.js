const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.tsx', '.js']
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx$/,
				loader: 'awesome-typescript-loader'
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{ loader: 'css-loader' },
						{ loader: 'sass-loader' }
					]
				})
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({ template: './index.html' }),
		new ExtractTextPlugin('style.css')
	]
};
