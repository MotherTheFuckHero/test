<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width:33.3%;height:.0625rem;" />
          <div class="d-flex jc-center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width:2.5rem;height:.625rem;" />
            <div class="title">
              <span class="title-text">旅游精准营销大数据平台</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width:3.125rem;height:.1rem;"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width:2.5rem;height:.625rem;"
            />
          </div>
          <dv-decoration-10 style="width:33.3%;height:.0625rem; transform: rotateY(180deg);" />
        </div>
        <p style="height:0.7rem" />
        <div class="body-boxs">
          <div class="left-box" style="margin-left: -0.2rem">
            <dv-border-box-13>
              <centerRight1 />
            </dv-border-box-13>
            <!--            <dv-border-box-8>-->
            <!--              <Centers />-->
            <!--            </dv-border-box-8>-->
            <dv-border-box-8>
              <centerLeft1 />
            </dv-border-box-8>
          </div>
          <div class="right-box">
            <dv-border-box-1>
              <bottomRight />
            </dv-border-box-1>
            <dv-border-box-8 :reverse="true">
              <div class="right-boxs">
                <centerRight2 />
                <bottomLeft />
              </div>
            </dv-border-box-8>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import centerLeft1 from './centerLeft1'
import centerRight1 from './centerRight1'
import centerRight2 from './centerRight2'
import bottomRight from './bottomRight'
import bottomLeft from './bottomLeft'
// import Centers from './center'
export default {
  components: {
    centerLeft1,
    centerRight1,
    centerRight2,
    bottomRight,
    bottomLeft
    // Centers
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.cancelLoading()
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
      setTimeout(() => {
        this.$router.go(0)
      }, 3600000)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/index.scss';
</style>
