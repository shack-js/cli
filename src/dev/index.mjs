import command from '../command.mjs'
import { getWebPackConfig } from '../utils.mjs'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import getApp from '@shack-js/runner-express'

export default () => command.command('dev')
  .option('-p, --port <port>', 'on port', parseInt, 3000)
  .option('-e, --extension <extension>', 'api extension', '.mjs')
  .action(async (options) => {
    // console.log(options)
    let { port = 3000, extension = '.mjs' } = options
    // console.log({ extension }, options)
    let conf = await getWebPackConfig()
    let compiler = webpack({ ...conf, mode: 'development' })
    let app = await getApp({ extension })
    app.use(middleware(compiler, {}))
    app.listen(port, () => console.log(`server started on ${port}`))
  })