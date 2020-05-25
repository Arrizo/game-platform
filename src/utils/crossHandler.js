function crossHandler(event, data) {
  top.postMessage(
    JSON.stringify({
      cmd: event,
      data
    }),
    '*'
  )
}

export default crossHandler
