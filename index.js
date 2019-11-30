const { publicAddress } = require('./stun')
const { createSocket } = require('dgram')
const argv = require('yargs').boolean('public').string('ping').argv

const port = argv.port || 1926

const main = async () => {
  console.log(`Using port ${port}`)
  const socket = createSocket('udp4')
  socket.bind(port, '0.0.0.0')
  socket.on('message', (b, r) => { console.log(b.length, r) })
  if (argv.public) {
    const result = await publicAddress(socket)
    console.log(result)
  }
  if (argv.ping) {
    setInterval(() => {
      const [ip, port] = argv.ping.split(':')
      socket.send('Ping!', parseInt(port), ip)
    }, 20)
  }
}

main().catch(e => console.log(e))
