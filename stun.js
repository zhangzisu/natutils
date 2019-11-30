exports.publicAddress = (s) => new Promise((resolve) => {
  const PSK = Buffer.from('FUCK IT')
  const i = setInterval(() => {
    s.send(PSK, 3379, 'api.zhangzisu.cn')
  }, 100)
  const l = (msg) => {
    clearInterval(i)
    s.removeListener('message', l)
    resolve(console.log(Buffer.from(msg.toString(), 'base64').toString()))
  }
  s.on('message', l)
})
