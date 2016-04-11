var debug = process.env.NODE_ENV != "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: path.join(__dirname, "src"),
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/client.js",
	plugins: [
    	new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	module: {
		loaders: [
			{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			},
			{ test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
		    { test: /\.ttf$/, loader: "file-loader" },
		    { test: /\.eot$/, loader: "file-loader" },
		    { test: /\.svg$/, loader: "file-loader" },
		    { test: /\.css$/, loader: "style!css" }
		]
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	output: {
		path: __dirname + "/src/",
		filename: "client.min.js"
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlagin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
	],
};