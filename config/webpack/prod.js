const baseConfig = require('./base'),
	webpack = require("webpack"),
	path = require('path'),
	_ = require('lodash'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

const prodConfig = baseConfig;

prodConfig.entry = [
	'./src/index'
];

// const loaders = prodConfig.module.loaders;
// const lessLoader = loaders[2];
// lessLoader.loader = ExtractTextPlugin.extract({
// 	fallbackLoader: "style!css!less",
// 	loader: "style!css!less"
// });
prodConfig.devtools = false;
prodConfig.debug = false;
prodConfig.plugins = _.concat(prodConfig.plugins, [
	//new ExtractTextPlugin("styles.css"),
	new webpack.optimize.UglifyJsPlugin({
		minimize: true,
        compress: {
            drop_debugger: true,
            warnings: false,
            drop_console: true
        }
	}),
	new webpack.optimize.DedupePlugin(),
]);

prodConfig.target = 'electron-renderer';


module.exports = prodConfig;