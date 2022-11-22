<template>
  <div>
    <div>
    <input v-model="temp" style="border:1px solid #000"/>
{{temp}}
    </div>
    <div @click="onClick">클릭</div>
    <div v-show="tempData">사라짐</div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      params: {},
      paramsPost: {},
      value: 4,
      emotion: true,
      tempData : true,
      temp:''
    }
  },

  computed: {
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
  },
  methods: {
    onClick() {
    this.tempData === true ? this.tempData = false : this.tempData = true
  },
}
}
</script>
