import { getWebPackConfig } from '../utils.mjs'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import middlewarehot from 'webpack-hot-middleware'
import getApp from '@shack-js/runner-express'

export const getDevApp = async (options) => {
  // console.log(options)
  let { extension = '.mjs', writedisk, ...rest } = options
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