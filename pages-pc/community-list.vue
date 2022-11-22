<template>
  <div>
    <div class="flex">
      <div class="flex-right">
        <div>
          <button
            v-b-modal.write
            class="jelly-btn jelly-btn--default"
            onclick="alert('안뇽?')"
          >
            글쓰기
          </button>
          <b-modal id="write" title="글쓰기"> 글쓰기모달테스트 </b-modal>
        </div>
      </div>
    </div>
    <table class="jelly-table m-t-3">
      <tr>
        <th>제목</th>
        <th>작성자</th>
        <th>관리</th>
      </tr>
      <tr>
        <td v-b-modal.list>글제목입니다글제목입니다글제목입니다</td>
        <b-modal id="list" title="리스트내용"> asdfasdfasdf </b-modal>
        <td>홍길동</td>
        <td>
          <div class="flex">
            <button 
            class="flex-full jelly-btn jelly-btn--default m-r-1"
            onclick="alert('안뇽?')"
            >
              삭제
            </button>
            <button
              v-b-modal.modify
              class="flex-full jelly-btn jelly-btn--default m-l-1"
            >
              수정
            </button>
            <b-modal id="modify"> asdfasdfasdf </b-modal>
          </div>
        </td>
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
