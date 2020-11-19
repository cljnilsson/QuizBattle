import path from "path";
import webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const plugins = [
    new HtmlWebPackPlugin({
        hash: true,
        filename: "index.html", //target html
        template: "./src/client/html/index.html" //source html
	}),
	new ExtractTextPlugin("styles.css")
];

const config: webpack.Configuration = {
    entry: "./src/client/index.tsx",
    module: {
        rules: [
            {
                test: /\.(tsx)x?$/,
                exclude: /node_modules|public/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },

            },
            {
                test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
            },
            {
                test: /\.(png|jpg|gif|webm|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]"
                    }
                }]
            }
        ],
    },
    resolve: {
        extensions: [".js", ".tsx", ".ts"],
    },
    output: {
		path: path.resolve(__dirname, "dist/public"),
		publicPath: '/',
        filename: "bundle.js",
	},
	watch: true,
	stats: "minimal",
	performance: {
		hints: false
	},
    plugins
};

export default config;