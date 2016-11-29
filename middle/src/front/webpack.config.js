var libraryName = "ScrelecCrm";
var path = require("path");;
var webpack = require("webpack");
//var path = path.resolve(__dirname, '');

module.exports = {
     entry: path.resolve(__dirname, './src/index.js'),
     output: {
         path: path.resolve(__dirname, '../../bin/'),
         publicPath: "bin/",
         filename: 'bundle.js',
         library: libraryName,
         libraryTarget: 'umd',
         umdNamedDefine: true
     },
     module: {
        loaders: [
      	    { test:  /\.vue$/, loader: "vue" },
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            { test: /\.png$/, loader: "url-loader?limit=100000",
              query: {
                name: 'images/[name].[ext]'
              }},
            { test: /\.jpg$/, loader: "file-loader",
              query: {
                name: 'images/[name].[ext]'
              }},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader",
              query: {
                limit: 10000,
                mimetype: 'application/font-woff',
                name: 'fonts/[name].[ext]'
              }},
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader",
              query: {
                limit: 10000,
                name: 'fonts/[name].[ext]'
            }}
      	]
     },
     plugins: [
       // Muse use jquery as global cause of broked modules (bootstrap)
       new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery'
        })
     ],
     resolve: {
       alias: {
         "_components" : path.resolve(__dirname, "./src/Components"),
         "_services" : path.resolve(__dirname, "./src/Services")
       }
     },
     /**resolve: {
       // Because bootstrap use jQuery as a global, we must tell webpack what is the variable jQuery
        alias: {
            'jquery': require.resolve('jquery'),
            'jQuery': require.resolve('jquery'),
            '$': require.resolve('jquery')
        }
     },**/
     vue: {
	}
};
