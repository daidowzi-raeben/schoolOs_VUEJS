<template>
  <div>
    <div class="flex">
      <div class="mr-2">
        <select class="jelly-text" style="width: 150px; height: 38px">
          <option :value="null">선택하세요</option>
          <option value="Y">작성자</option>
          <option value="N">제목 + 내용</option>
        </select>
      </div>

      <div>
        <b-input-group>
          <b-form-input type="text" min="0.00"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-primary">검색</b-button>
            <!-- 버튼에 클래스를 넣을 수 있어 부트스트랩은 다 클래스 넣을 수 있으니까 원하는 부분에 넣는건데 -->
          </b-input-group-append>
        </b-input-group>
      </div>

      <div class="flex-right">
        <button
          v-b-modal.write
          class="jelly-btn jelly-btn--default"
          onclick="alert('안뇽?')"
        >
          글쓰기
        </button>
      </div>
    </div>
    <table class="jelly-table m-t-3">
      <tr>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
        <th>관리</th>
      </tr>
      <tr>
        <td v-b-modal.list>글제목입니다글제목입니다글제목입니다</td>
        <td id="tooltip-target-1" class="cursor-active">
          김수한무거북이와두루미
        </td>
        <td v-b-modal.list>22.22.22</td>
        <td v-b-modal.list>999</td>
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
          </div>
        </td>
      </tr>
    </table>
    <!-- 모달창 -->
    <b-modal id="write" title="글쓰기"> 글쓰기모달테스트</b-modal>
    <b-modal id="list" title="리스트내용">커뮤니티리스트내용</b-modal>
    <b-modal id="writer">작성자정보</b-modal>
    <b-modal id="modify">수정</b-modal>
    <b-modal id="info">작성자 정보</b-modal>
    <!-- 툴팁 -->
    <b-tooltip
      custom-class="tooltip-custom"
      target="tooltip-target-1"
      triggers="click"
      placement="right"
    >
      <!-- 여기는 툴팁 넣을 때 이렇게 하나만 넣으면 되잖아 근데 이거를 개도구로 보니까 이렇게 뭐가 존나 많은 거임 -->
      <!-- 그래서 이걸 스타일로 찾아가야 하는데 함 보여줄게 -->
      <!-- 지금 클래스 들어간거보여? 이런식으로 조금 씩 다른게 있어서 문서를 확인해야 하는 경우도 있어 아놔 -->
      <div>
        <a href="#">작성자 글 보기</a>
      </div>
      <!-- 모달 -->
      <div v-b-modal.info>작성자 정보 보기</div>
    </b-tooltip>
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

<style lang="scss">
.cursor-active {
  cursor: pointer !important;
}
.tooltip-custom {
  top: -3px !important;
  left: -190px !important;
  .tooltip-inner {
    padding: 10px 8px;
    div {
      font-size: 15px;
      a {
        &:link {
          color: #fff;
          text-decoration: none;
        }
        &:visited {
          color: #fff;
          text-decoration: none;
        }
        &:hover {
          color: #fff;
          text-decoration: none;
        }
      }
    }
    div:first-child {
      margin-bottom: 6px;
    }
  }
}
</style>
