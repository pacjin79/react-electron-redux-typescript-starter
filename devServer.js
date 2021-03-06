const webpack = require('webpack');
const express = require('express');
const config = require('./config/webpack/dev');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

const PORT = process.env.PORT || 9090;

const wdm = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true
	}
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', err => {
	if (err) {
		console.error(err);
		return;
	}

	console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
	console.log('Stopping dev server');
	wdm.close();
	server.close(() => {
		process.exit(0);
	});
});