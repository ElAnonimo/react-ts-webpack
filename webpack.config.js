const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
	plugins: []
};
