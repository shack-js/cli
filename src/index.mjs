#! /usr/bin/env node
import { join } from 'path';
import fs from 'fs-extra'
import { getDirname } from './utils.mjs'
import init from './init/index.mjs'
import build from './build/index.mjs'
import dev from './dev/index.mjs'
import command from './command.mjs'

let pkg = fs.readJSONSync(join(getDirname(import.meta.url)
  , '..', 'package.json'))
command.version(pkg.version).action(() => command.help())
init()
build()
dev()

command.parse()