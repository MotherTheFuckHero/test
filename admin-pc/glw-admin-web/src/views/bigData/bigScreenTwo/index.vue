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
              <span class="title-text">旅游综合治理大数据平台</span>
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

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-11 title="实时地图">
                <leftTop />
                <bottomLeft />
              </dv-border-box-11>
            </div>
            <div style="margin-top:.3rem ">
              <dv-border-box-1>
                <rightTop />
                <TopRightCmp />
                <centerLeft1 />
              </dv-border-box-1>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import centerLeft1 from './centerLeft1'
import bottomLeft from './bottomLeft'
import leftTop from './leftTop'
import rightTop from './rightTop'
import TopRightCmp from './TopRightCmp'
export default {
  components: {
    centerLeft1,
    bottomLeft,
    leftTop,
    rightTop,
    TopRightCmp
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
      // setTimeout(() => {
      //   this.$router.go(0)
      // }, 3600000)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/index.scss';
.content-box{
  margin-top: .2rem;
}
</style>
