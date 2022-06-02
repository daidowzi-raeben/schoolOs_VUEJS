<template>
  <div>
    <input class="jelly-text" @input="onClickSendMassage($event)" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      msg: '',
    }
  },
  created() {},
  mounted() {
    this.makeIO()
    this.socket.emit('joinRoom', 1)
  },
  methods: {
    makeIO() {
      this.socket = this.$nuxtSocket({
        name: 'SOS_NODE_SERVER',
        channel: '/',
        emitTimeout: 1000,
      })
      this.socket.on('news', (msg, cb) => {
        console.log('socket.io로부터 받은 메시지 : ', msg)
        this.socket.emit('nuxt', 'nuxt에서 보냄...')
      })
    },
    onClickSendMassage(event) {
      this.$emit('chat', event.target.value)
    },
  },
}
</script>

<style lang="scss"></style>
