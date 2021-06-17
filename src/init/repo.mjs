const matches = [
  [/[A-Za-z0-9_.-]+/, x => `https://github.com/shack-js/template-${x}`],
  [/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/, x => `https://github.com/${x}`],
]


export default (tmpl = '') => {
  if (!tmpl) throw `template shall not be empty!`
  for (let [regex, fn] of matches) {
    if (regex.test(tmpl)) return fn(tmpl)
  }
  return tmpl
}