import { readFileSync } from 'fs'
import { PeerServer } from 'peer'

const peerServer = PeerServer({
  port: 9000,
  path: '/myapp',
  ssl: {
    key: readFileSync('./server/ssl/server.key'),
    cert: readFileSync('./server/ssl/server.crt'),
  }
})

// peerServer.on('connection', client => console.log(client))
