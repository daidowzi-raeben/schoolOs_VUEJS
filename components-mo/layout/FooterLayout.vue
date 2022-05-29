<template>
  <div class="jelly-footer">
    <footer>
      <div class="nav">
        <nav>
          <ul class="flex flex-space">
            <li class="is_active">
              <nuxt-link to="/">
                <b-icon icon="house"></b-icon>
                <p>홈</p>
              </nuxt-link>
            </li>
            <li>
              <b-icon icon="controller"></b-icon>
              <p>퀘스트</p>
            </li>
            <li>
              <b-icon icon="bag"></b-icon>
              <p>마켓</p>
            </li>
            <li>
              <b-icon icon="alarm"></b-icon>
              <p>알림장</p>
            </li>
            <li>
              <b-icon icon="exclamation-triangle"></b-icon>
              <p>신고</p>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/layout.scss';
</style>
