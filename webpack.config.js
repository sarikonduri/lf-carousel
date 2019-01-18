const path = require("path");

module.exports = {
    devServer: {
        openPage: '/',
        compress: true,
        port: 9000
    },
    entry: ["@babel/polyfill", "./src/scripts/index.js", './src/styles/styles.scss'],
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["src/"]
                    }
                }]
            }
        ]
    }
};