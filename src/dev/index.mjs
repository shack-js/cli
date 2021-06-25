import command from '../command.mjs'
import { getWebPackConfig } from '../utils.mjs'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import middlewarehot from 'webpack-hot-middleware'
import getApp from '@shack-js/runner-express'

export default () => command.command('dev')
  .option('-p, --port <port>', 'on port', parseInt, 3000)
  .option('-e, --extension <extension>', 'api extension', '.mjs')
  .option('-a, --apis <folder>', 'api folder', 'apis')
  .option('-w, --writedisk [boolean]', 'write assets to disk', str => str != 'false', false)
  .option('-s, --static <folder>', 'serve folder as static', 'dist')
  .action(async (options) => {
    // console.log(options)
    let { port = 3000, extension = '.mjs', writedisk, ...rest } = options
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
    let app = await getApp(
      { ...rest, extension },
      app => {
        // console.log(compiler)
        app.use(middleware(compiler, {
          writeToDisk: !!writedisk,
        }))
        app.use(middlewarehot(compiler))
      }
    )
    app.listen(port, () => console.log(`server started on ${port}`))
  })