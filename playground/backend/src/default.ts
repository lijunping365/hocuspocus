import {connectedPayload, Server} from '@hocuspocus/server'
import { Logger } from '@hocuspocus/extension-logger'
import { SQLite } from '@hocuspocus/extension-sqlite'

const server = Server.configure({
  port: 1234,
  address: '127.0.0.1',
  name: 'hocuspocus-fra1-01',
  extensions: [
    new Logger(),
    new SQLite(),
  ],

  async onConnect(data) {
    console.log('🔮', data)
  },

  async onAuthenticate(data) {
    console.log('ssssss', data, data.token)
  },

  // Test error handling
  // async onConnect(data) {
  //   throw new Error('CRASH')
  // },

  // async onConnect(data) {
  //   await new Promise((resolve, reject) => setTimeout(() => {
  //     // @ts-ignore
  //     reject()
  //   }, 1337))
  // },

  // async onConnect(data) {
  //   await new Promise((resolve, reject) => setTimeout(() => {
  //     // @ts-ignore
  //     resolve()
  //   }, 1337))
  // },

  async connected(data: connectedPayload): Promise<any> {
    console.log('vvvvvvvvvvvvvvv', data)
  },

  // Intercept HTTP requests
  onRequest(data) {
    return new Promise((resolve, reject) => {
      const { response } = data
      console.log('Respond with your custom content')
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('This is my custom response, yay!')

      // Rejecting the promise will stop the chain and no further
      // onRequest hooks are run
      return reject()
    })
  },
})

server.enableMessageLogging()

server.listen()
