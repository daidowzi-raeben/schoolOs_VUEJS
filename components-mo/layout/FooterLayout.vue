<template>
  <div class="jelly-footer">
    <footer>
      <div class="nav">
        <nav class="m-t-1">
          <ul class="flex flex-space">
            <li :class="$nuxt._route.name === 'index' ? 'is_active' : ''">
              <nuxt-link to="/">
                <b-icon icon="house"></b-icon>
                <p>홈</p>
              </nuxt-link>
            </li>
            <li
              :class="
                $nuxt._route.name === 'todo-list-id' ||
                $route.name === 'todo-my-list-id'
                  ? 'is_active'
                  : ''
              "
            >
              <nuxt-link to="/todo-list/0">
                <b-icon icon="controller"></b-icon>
                <p v-if="LOGIN_STUDENT">
                  {{ LOGIN_STUDENT.t_todo_name }}
                </p>
              </nuxt-link>
            </li>
            <li
              :class="
                $nuxt._route.name === 'market-list-id' ||
                $route.name === 'market-detail-id'
                  ? 'is_active'
                  : ''
              "
            >
              <nuxt-link to="/market-list/0">
                <b-icon icon="bag"></b-icon>
                <p>마켓</p>
              </nuxt-link>
            </li>
            <li
              :class="
                $nuxt._route.name === 'notice-list-id' ||
                $route.name === 'notice-detail-id'
                  ? 'is_active'
                  : ''
              "
            >
              <nuxt-link to="/notice-list/1">
                <b-icon icon="alarm"></b-icon>
                <p>알림장</p>
              </nuxt-link>
            </li>
            <!-- <li>
              <nuxt-link to="/bill-list">
                <b-icon icon="percent"></b-icon>
                <p>
                  벌금카드
                  <span v-if="GET_AXIOS_CALLBACK_DATA_BILL" class="badge">{{
                    GET_AXIOS_CALLBACK_DATA_BILL
                  }}</span>
                </p>
              </nuxt-link>
            </li> -->
            <li :class="$nuxt._route.name === 'sue-request' ? 'is_active' : ''">
              <nuxt-link to="/sue-request">
                <b-icon icon="exclamation-triangle"></b-icon>
                <p>신고</p>
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'DefaultLayoutFooter',
  data() {
    return {
      paramsBill: {},
    }
  },
  computed: {
    ...mapState(['LOGIN', 'GET_AXIOS_CALLBACK_DATA_BILL']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  mounted() {
    console.log('FOOTER', this.$nuxt._route.name)
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    this.paramsBill = this.LOGIN_CONFIG
    this.paramsBill.type = 'billStudentCnt'
    this.GET_AXIOS(this.paramsBill)
    console.log('FOOTER==========', this.LOGIN_CONFIG)
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/layout.scss';
@import '~/assets-mo/common.scss';
</style>
