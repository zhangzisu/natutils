const { publicAddress } = require('./stun')
const { createSocket } = require('dgram')
const argv = require('yargs').boolean('public').string('ping').argv

const port = argv.port || 1926

const main = async () => {
  console.log(`Using port ${port}`)
  const socket = createSocket('udp4')
  socket.bind(port, '0.0.0.0')
  if (argv.public) {
    const result = await publicAddress(socket)
    console.log(`${result.address}:${result.port}`)
  }
  if (argv.ping) {
    const [ip, port] = argv.ping.split(':')
    socket.send('Ping!', parseInt(port), ip)
    console.log(`Pinged ${ip}:${port}`)
  }
}

main().catch(e => console.log(e))
