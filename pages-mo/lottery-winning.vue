<template>
  <div id="school-content">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
    <div class="historyBack m-l-3 m-b-5 flex">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="p-3 jelly-tab m-l-3 m-r-3">
      <ul class="flex">
        <li class="is_active">asd</li>
        <li>
          <nuxt-link to="/item-list/0" style="color: #111">asd</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="relative">
      <div
        ref="animationTitle"
        style="
          width: 100px;
          position: absolute;
          left: 50%;
          margin-left: 10px;
          margin-top: -20px;
        "
      ></div>
      <div class="text-center bold" style="font-size: 40px">
        <em>3등</em>
      </div>
      <div class="text-center font-14 m-t-1">축하합니다.</div>
      <div class="text-center m-t-3">
        <span class="font-14">당첨금 : </span>
        <strong style="font-size: 30px"><em>123,123</em></strong>
      </div>
    </div>
    <div ref="animationElement"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LOADING: false,
    }
  },
  mounted() {
    // 감자
    this.winningTitle()
    this.winningStudent()
  },
  methods: {
    // french-fries
    winningTitle() {
      this.$lottie.loadAnimation({
        container: this.$refs.animationTitle, // the dom element that will contain the animation
        loop: true,
        autoplay: true,
        // autoplay: true,
        path: '/img/french-fries.json', // the path to the animation json
      })
    },
    winningStudent() {
      this.$lottie.loadAnimation({
        container: this.$refs.animationElement, // the dom element that will contain the animation
        loop: false,
        autoplay: true,
        // autoplay: true,
        path: '/img/congratulations_3.json', // the path to the animation json
      })
    },
  },
}
</script>

<style></style>
