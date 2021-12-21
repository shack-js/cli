import { getWebPackConfig } from '../utils.mjs'
import getApp from '@shack-js/runner-express'

import Webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"


const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log("Starting server on http://localhost:8080");
})


export const startDevApp = async (options) => {
  // console.log(options)
  let { extension = '.mjs', ...rest,port } = options
  // console.log({ extension }, options)
  let conf = await getWebPackConfig()
  conf.devtool = conf.devtool || 'inline-source-map',
    conf.plugins.unshift(new webpack.HotModuleReplacementPlugin())
  let hotEntry = 'webpack-hot-middleware/client?reload=true'
  if (Array.isArray(conf.entry)) {
    conf.entry.unshift(hotEntry)
  } else {
    switch (typeof conf.entry) {
      case 'string': {
        conf.entry = [hotEntry, conf.entry]
      } break;
      case 'object': {
        conf.entry['hot-reload'] = hotEntry
      }
    }
  }
  let compiler = webpack({ ...conf, mode: 'development' })
  // console.log({ writedisk })
  return await getApp(
    { ...rest, extension },
    app => {
      // console.log(compiler)
      app.use(middleware(compiler, {
        writeToDisk: !!writedisk,
      }))
      app.use(middlewarehot(compiler))
    }
  )
}