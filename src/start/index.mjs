import command from '../command.mjs'
import getApp from '@shack-js/runner-express'

export default () => command.command('start')
  .option('-p, --port <port>', 'on port', x=>parseInt(x), 3000)
  .option('-e, --extension <extension>', 'api extension', '.mjs')
  .option('-a, --apis <folder>', 'api folder', 'apis')
  .option('-s, --static <folder>', 'static folder', 'dist')
  .action(async (options) => {
    let { port = 3000, ...rest } = options
    let app = await getApp(rest)
    app.listen(port, () => console.log(`server started on ${port}`))
  })