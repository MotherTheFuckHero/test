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
              <span class="title-text">旅游企业监管大数据平台</span>
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
          <dv-decoration-10 style="width:33.3%;height:.125rem; transform: rotateY(180deg);" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="width: 6.25rem; text-align: left;background-color: #0f1325;"
            >
              <span class="react-before" />
              <span class="text" style="font-size: 0.3rem">数据分析</span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325;">
              <span class="text colorBlue" style="font-size: 0.3rem">融资总览</span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b" style="font-size: 0.3rem">项目情况</span>
            </div>
            <div
              class="react-left mr-3"
              style="width: 6.25rem; background-color: #0f1325; text-align: right;"
            >
              <span class="react-after" />
              <span class="text" style="font-size: 0.3rem">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
            </div>
          </div>
        </div>

        <div class="body-boxone">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
              </dv-border-box-12>
            </div>
            <!--            <div>-->
            <!--              <centerRight2 />-->
            <!--            </div>-->
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <dv-border-box-8 :reverse="true">
              <bottomLeft />
            </dv-border-box-8>
            <!--            <dv-border-box-12>-->
            <!--              <bottomRight />-->
            <!--            </dv-border-box-12>-->
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import { formatTime } from '../../../utils/index.js'
import centerLeft1 from './centerLeft1'
import centerRight1 from './centerRight1'
// import centerRight2 from './centerRight2'
import bottomLeft from './bottomLeft'
// import bottomRight from './bottomRight'
export default {
  components: {
    centerLeft1,
    // centerLeft2,
    centerRight1,
    // centerRight2,
    // center,
    bottomLeft
    // bottomRight
  },
  data() {
    return {
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
  },
  methods: {
    timeFn() {
      setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
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
