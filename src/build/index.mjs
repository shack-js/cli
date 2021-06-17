import command from '../command.mjs'
import { getWebPackConfig } from '../utils.mjs'
import webpack from 'webpack'

export default () => command.command('build')
  .action(async () => {
    let conf = await getWebPackConfig()
    let compiler = webpack({ ...conf, mode: 'production' })
    compiler.run((err, stats) => console.log(err,stats.toString()))
  })