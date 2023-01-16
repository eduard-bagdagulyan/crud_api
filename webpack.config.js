const path = require('path')

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/main.ts',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
}
