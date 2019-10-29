const stun = require('stun')
const { STUN_BINDING_REQUEST, STUN_ATTR_MAPPED_ADDRESS } = stun.constants

exports.publicAddress = (s) => new Promise((resolve) => {
  const request = stun.createMessage(STUN_BINDING_REQUEST)
  const i = setInterval(() => {
    s.send(request.toBuffer(), 3478, 'stun.ideasip.com')
  }, 100)
  s.on('message', (msg) => {
    clearInterval(i)
    s.removeAllListeners()
    const stunMsg = stun.decode(msg)
    resolve(stunMsg.getAttribute(STUN_ATTR_MAPPED_ADDRESS).value)
  })
})
