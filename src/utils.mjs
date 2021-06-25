import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, resolve, join } from 'path'
import fs from 'fs-extra'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const SHACK_CONFIG_FILE = 'shack.config.mjs'

export function getFilename(url) {
  return fileURLToPath(url)
}

export function getDirname(url) {
  return dirname(getFilename(url))
}

export async function getWebPackConfig() {
  let configFile = join(process.cwd(), SHACK_CONFIG_FILE)
  if (!await fs.pathExists(configFile)) return mergeConfig({})
  let m = await import(pathToFileURL(configFile))
  return mergeConfig(m.default)
}

function mergeConfig(conf = {}) {
  let defaultConfig = getDefaultConfig()
  let c = {
    ...defaultConfig,
    ...conf
  }
  if (!c.module) c.module = {}
  if (!c.module.rules) c.module.rules = []
  let rules = c.module.rules
  if (!rules.some(x => x.use && x.use.loader == '@shack-js/loader-fetch')) {
    rules.push({
      test: /[\/|\\]apis[\/|\\].*\.((m|c)?jsx?|tsx?)$/,
      use: {
        loader: '@shack-js/loader-fetch',
        options: {
          apiPrefix: '/apis',
          backendFolder: 'apis',
          sourceType: 'module'
        }
      }
    })
  }
  if (!c.plugins) c.plugins = []
  if (!c.plugins.some(x => x.constructor && x.constructor.name == 'HtmlWebpackPlugin')) {
    c.plugins.push(new HtmlWebpackPlugin)
  }
  return c
}

function getDefaultConfig() {
  return {
    devtool: 'inline-source-map',
    entry: resolve(process.cwd(), './web/index.mjs'),
    output: {
      path: resolve(process.cwd(), './dist'),
      filename: '[contenthash].js'
    }
  }
}