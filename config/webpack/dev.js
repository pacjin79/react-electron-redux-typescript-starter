const baseConfig = require('./base'),
	webpack = require('webpack'),
	_ = require('lodash'),
	path = require('path');

const devConfig = baseConfig;

const port = process.env.PORT || 9090;


devConfig.entry = [
	`webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
	'./src/index'
];

devConfig.devtools = "source-map";

devConfig.debug = true;

devConfig.output.publicPath = `http://localhost:${port}/build/`;

devConfig.plugins = _.concat(devConfig.plugins, [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development')
	})
]);

devConfig.target = 'electron-renderer';

module.exports = devConfig;