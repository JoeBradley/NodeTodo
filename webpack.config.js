"use strict";

module.exports = {
    entry: "./app.js",
    output: {
        filename: "./Scripts/bundle.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query:
                {
                    presets: ['react']
                }
            }
        ]
    }
};