import { getWebPackConfig } from '../utils.mjs'
import getApp from '@shack-js/runner-express'

import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"

export const startDevApp = async (options) => {
  // console.log(options)
  let { extension = '.mjs', apis, port } = options
  // console.log({ extension }, options)
  let conf = await getWebPackConfig()
  conf.devtool = conf.devtool || 'inline-source-map'

  let compiler = webpack({ ...conf, mode: 'development' })
  const server = new WebpackDevServer({
    port,
    hot: true,
    onAfterSetupMiddleware: function (devServer) {
      getApp({
        extension,
        apis,
      }, devServer.app)
    },
    ...(conf.devServer || {}),
  }, compiler);

  server.startCallback(() => console.log(`server started on ${port}`))
}