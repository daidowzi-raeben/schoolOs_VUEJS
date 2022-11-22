<template>
  <div>
    <table class="jelly-table">
      <tr>
        <th>제목</th>
        <th>이름</th>
        <th>날짜</th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  layout: 'default-pc',
  computed: {
    ...mapState(['LOGIN', 'GET_AXIOS_CALLBACK_DATA_MAIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  mounted() {
    this.GET_AXIOS()
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
  },
}
</script>

<style></style>
