/// <binding AfterBuild='Run - Development' />
module.exports = {
    entry: __dirname + '/App/main.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'build.js',
        path: __dirname + '/wwwroot/js'
    }
};