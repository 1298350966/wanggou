const CopyWebpackPlugin = require('copy-webpack-plugin'); // npm install --save-dev copy-webpack-plugin


module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
            // mutate config for production...
        }
        config.plugins.push(
            new CopyWebpackPlugin([
                {
                    from: './static', // 新增可以被index.html访问的静态文件目录,支持多个
                    to: this.outputDir,
                    ignore: ['.*']
                }
            ])
        )
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/goods': {
                target: 'http://localhost:3000'
            },
            '/goods/*': {
                target: 'http://localhost:3000'
            },
            '/users/*': {
                target: 'http://localhost:3000'
            }
        }
    }
}