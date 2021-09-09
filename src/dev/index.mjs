import command from '../command.mjs'
import { getDevApp } from './get-dev-app.mjs'


export default () => command.command('dev')
  .option('-p, --port <port>', 'on port', parseInt, 3000)
  .option('-e, --extension <extension>', 'api extension', '.mjs')
  .option('-a, --apis <folder>', 'api folder', 'apis')
  .option('-w, --writedisk [boolean]', 'write assets to disk', str => str != 'false', false)
  .option('-s, --static <folder>', 'serve folder as static', 'dist')
  .action(async (options) => {
    let { port = 3000,  ...rest } = options
    let app = await getDevApp(rest)
    app.listen(port, () => console.log(`server started on ${port}`))
  })