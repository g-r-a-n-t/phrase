import config from 'config'

const debug = config.debug

function print (msg, ...values) {
  console.log(`debug: ${msg} `, ...values)
}

function componentRender (comp, ...objs) {
  if (debug.components) print(`Rendering ${comp} with params: `, ...objs)
}

function cacheGet (id, value) {
  if (debug.cache) print(`Cache get on ${id} resulted in: `, value)
}

function cacheSet (id, value) {
  if (debug.cache) print(`Cache set on ${id} with value: `, value)
}

function networkOutbound (action, ...values) {
  if (debug.network) print(`Outbound network request to ${action} with value(s): `, ...values)
}

function networkInbound (action, ...values) {
  if (debug.network) print(`Inbound network event to ${action} with value(s): `, ...values)
}

export default {
  componentRender,
  cacheSet,
  cacheGet,
  networkOutbound,
  networkInbound
}
