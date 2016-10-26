const baseConfig = require('./base'),
	webpack = require("webpack"),
	path = require('path'),
	_ = require('lodash');

const prodConfig = baseConfig;

prodConfig.entry = [
	'./src/index'
];
prodConfig.devtools = false;
prodConfig.debug = false;
prodConfig.plugins = _.concat(prodConfig.plugins, [
	new webpack.optimize.DedupePlugin()
]);

prodConfig.target = 'electron-renderer';


module.exports = prodConfig;