<script setup>
  import { ref } from 'vue'
  import { Peer } from 'peerjs'

  const peer = ref()
  const conn = ref()

  const name = ref('')
  const target = ref('')
  const msg = ref('')

  const register = () => {
    peer.value = new Peer(name.value, {
      host: 'localhost',
      secure: true,
      port: 9000,
      path: '/myapp'
    })

    peer.value.on('open', id => {
      console.log(id)
    })

    peer.value.on('connection', conn => {
      conn.on('data', data => {
        console.log(data)
      })
    })

    peer.value.on('call', async call => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
        call.answer(stream)
        call.on('stream', remoteStream => {
          console.log(remoteStream)
          audio.value.srcObject = remoteStream
          audio.value.play()
        })
      } catch(err) {
        console.log(err)
      }
    })
  }

  const audio = ref()

  const send = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })

      const call = peer.value.call(target.value, stream)
      call.on('stream', remoteStream => {
        console.log(remoteStream)
      })
    } catch(err) {
      console.log(err)
    }

    // conn.value = peer.value.connect(target.value)
    // // console.log(conn)
    // conn.value.on('open', () => {
    //   console.log('asdasds')
    // })
    // conn.value.send(msg.value)
  }
</script>

<template>
  <br />
  <input v-model="name" type="text" name="" id="">
  <button @click="register">register</button><br />
  <input v-model="target" type="text" name="" id=""><br />
  <input v-model="msg" type="text" name="" id="">
  <button @click="send">send</button>

  <audio ref="audio"></audio>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
