
export function debug (msg, ...objs) {
  console.log(`debug: ${msg} `, ...objs)
}

export function debugComponentRender (comp, ...objs) {
  debug(`Rendering ${comp} with params: `, ...objs)
}
