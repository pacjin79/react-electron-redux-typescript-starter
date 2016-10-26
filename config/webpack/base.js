const path = require("path"),
	webpack = require("webpack"),
	srcPath = path.join(__dirname, '../..', 'src'),
	staticPath = path.join(__dirname, '../..', 'static'),
	buildPath = path.join(__dirname, '../..', 'build');
	HtmlWebpackPlugin = require('html-webpack-plugin');

const commonLibs = [
	"react",
	"react-dom",
	"lodash",
	"immutable",
	"jquery",
	"redux",
	"react-redux",
	"react-router",
	"react-router-redux",
	"redux-actions",
	"redux-logger",
	"redux-thunk",
	"reselect"
];

const baseConfig = {
	entry: {
		app: [
			path.join(srcPath, "index")
		],
		common: commonLibs
	},
	resolve: {
		root: srcPath,
		moduleDirectories: ['node_modules'],
		extensions: ['', '.js', '.ts', '.tsx', '.css'],
		packageMains: ['webpack', 'main']
	},
	output: {
		path: buildPath,
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		/*new HtmlWebpackPlugin({
			inject: true,
			excludeChunks: ['test'],
			template: path.join(staticPath, "index.html")
		}),*/
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	module: {
		loaders: [
			{
				test: /\.(ts|tsx)?$/,
				loaders: ["ts-loader"]
			},
			{test: /\.css?$/, loader: "style!css"},
			{test: /\.less$/, loader: 'style!css!less'},
			{
				test: /\.scss$/,
				loader: "style-loader!raw-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
			},
			{
				test: /.*\.(png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
				]
			},
			{
				test: /\.(jpe|jpg)$/,
				loader: 'url?limit=25000'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url?limit=100000&minetype=application/font-wof'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file"
			}
		]
	},
	node: {
		__dirname: false,
		__filename: false
	}
};

module.exports = baseConfig;