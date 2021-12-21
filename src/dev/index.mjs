import command from '../command.mjs'
import { startDevApp } from './start-dev-app.mjs'


export default () => command.command('dev')
  .option('-p, --port <port>', 'on port', x => parseInt(x), 3000)
  .option('-e, --extension <extension>', 'api extension', '.mjs')
  .option('-a, --apis <folder>', 'api folder', 'apis')
  .option('-w, --writedisk [boolean]', 'write assets to disk', str => str != 'false', false)
  .option('-s, --static <folder>', 'serve folder as static', 'dist')
  .action(async (options) => {
    let app = await startDevApp(options)
  })