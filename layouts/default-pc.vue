<template>
  <div id="jellyAdmin">
    <div class="jelly-admin flex">
      <div class="gnb">
        <h1>LOGO</h1>
        <nav class="m-t-5">
          <ul>
            <li v-for="item in 5" :key="item">
              <nuxt-link to="/" :class="item === 1 ? 'is_active' : ''">
                <b-icon icon="bag" class="m-r-1"></b-icon>
                gnb0{{ item }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="flex-full m-l-2 content">
        <div class="content__body"><Nuxt /></div>
      </div>
    </div>
    <div id="liveChat">asd</div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayoutPC',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/var.scss';
@import '~/assets-mo/style.scss';
@import '~/assets-mo/reset.scss';
@import '~/assets-pc/layout.scss';
</style>
