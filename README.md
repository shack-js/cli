# @shack.js/cli

what is shack.js? https://github.com/shack-js/shack.js/blob/main/README.md

## usage

- npx : `npx @shack.js/cli`
- npm : `npm i @shack.js/cli -g && shack`

### `init <project> [-t template]`

init a project based on template

```
shack init my-app # init project from basic tempalte
shack init my-app -t react-typescript # init from react-typescript template
shack init my-app -t https://github.com/some/repo # from git repo
```

### `dev [-p <port>] [-e <extension>] [-a <apis>] [-s <staticfolder>] [-w <writedisk>]`

run project in development mode

```
shack dev
node --loader ts-node/esm node_modules/@shack-js/cli/src/index.mjs dev -e .ts  # typescript
```

### `build`

build project in production mode (webpack frontend only)

```
shack build
```

### `start [-p <port>] [-e <extension>] [-a <apis>] [-s <staticfolder>]`

```
shack start
shack start -e .js -s ./dist/web -a ./dist/tsc/apis # case typescript
```