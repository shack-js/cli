import command from '../command.mjs'
import { getWebPackConfig } from '../utils.mjs'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import getApp from '@shack-js/runner-express'

export default () => command.command('dev')
  .option('-p, --port', 'on port', parseInt, 3000)
  .action(async ({ port = 3000 }) => {
    let conf = await getWebPackConfig()
    let compiler = webpack({ ...conf, mode: 'development' })
    let app = await getApp()
    app.use(middleware(compiler, {
    }))
    app.listen(port, () => console.log(`server started on 3000`))
  })