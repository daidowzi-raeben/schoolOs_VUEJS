<template>
  <div>
    <qrcode-stream
      style="width: 100px; height: 100px"
      @decode="onDecode"
    ></qrcode-stream>
  </div>
</template>

<script>
export default {
  methods: {
    onDecode(decodedString) {
      console.log(decodedString)
    },
  },
}
</script>

<style></style>
