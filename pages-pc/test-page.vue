<template>
  <div>
    <div>
      <input v-model="price" @input="priceCustom($event)" />
    </div>
    <div>
      <input v-model="price2" @input="priceKrw($event)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 0,
      price2: 0,
    }
  },
  methods: {
    priceCustom(e) {
      this.price2 = e.target.value * 2
    },
    priceKrw(e) {
      this.price = e.target.value / 2
    },
  },
}
</script>
