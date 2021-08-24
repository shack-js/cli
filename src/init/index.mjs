import tpl from '@shack-js/template-repo'
import command from '../command.mjs'
import repo from './repo.mjs'

export default () => command.command('init <name>')
  .option('-t, --template <string>', 'use template', 'basic')
  .option('-d, --defaults <key>=<value>', 'default values', collect, {})
  .action(async (name, { defaults, template }) => {
    await tpl({ name, ...defaults }, repo(template), name)
    console.log(`project generated, run 'cd ${name}' and 'npm i' to install dependencies`)
    console.log(`for more information check README.md in generated project`)
  })

function collect(val, memo) {
  if (!/^.+=.+$/.test(val)) throw 'defaults must be key value paires'
  let [key, value] = val.split('=')
  memo[key] = value
  return memo
}