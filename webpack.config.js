import dotenv from "dotenv";
import HtmlWebpackPlugin from 'html-webpack-plugin'
dotenv.config();

module.exports = {
  entry: 'index.js',
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './view/index.html',
      mapboxKey: `${process.env.MAPBOX_KEY}`,
    });
  ]
}
