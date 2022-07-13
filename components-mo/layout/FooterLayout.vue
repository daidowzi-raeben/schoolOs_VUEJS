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
                <p>퀘스트</p>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/market-list/0">
                <b-icon icon="bag"></b-icon>
                <p>마켓</p>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/notice-list/1">
                <b-icon icon="alarm"></b-icon>
                <p>알림장</p>
              </nuxt-link>
            </li>
            <li>
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
export default {
  name: 'DefaultLayoutFooter',
  data() {
    return {}
  },
  mounted() {
    console.log('FOOTER', this.$nuxt._route.name)
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/layout.scss';
@import '~/assets-mo/common.scss';
</style>
