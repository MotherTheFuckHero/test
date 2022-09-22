<template>
  <div id="index">
    <dv-full-screen-container class="bgs">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div id="tab">
          <div class="tab-bar clearfix">
            <a
              v-for="(item,index) in items"
              :key="index"
              :class="{active : index===curId}"
              @click="tab(index)"
            >{{ item.item }}</a>
          </div>
        </div>
        <div class="body-boxMain">
          <!-- 地图 -->
          <div v-show="curId===0" class="one-box">
            <dv-border-box-1>
              <Map />
            </dv-border-box-1>
          </div>
          <!-- 客流量统计 -->
          <div v-if="curId===1" class="two-box">
            <div class="two-box-one">
              <dv-border-box-4>
                <topLeft />
              </dv-border-box-4>
              <dv-border-box-12>
                <centerLeft />
              </dv-border-box-12>
              <dv-border-box-13>
                <bottomLeft />
              </dv-border-box-13>
            </div>
            <div class="two-box-one">
              <dv-border-box-1>
                <centerTop />
              </dv-border-box-1>
              <dv-border-box-8>
                <centerCenter />
              </dv-border-box-8>
              <dv-border-box-1>
                <centerBottom />
              </dv-border-box-1>
            </div>
            <div class="two-box-one">
              <dv-border-box-13>
                <topRight />
              </dv-border-box-13>
              <dv-border-box-12>
                <centerRight />
              </dv-border-box-12>
              <dv-border-box-13>
                <bottomCenterRight />
              </dv-border-box-13>
              <dv-border-box-4 :reverse="true">
                <bottomRight />
              </dv-border-box-4>
            </div>
          </div>
          <!-- 统计分析 -->
          <div v-if="curId===2" class="three-box">
            <div class="homeBox">
              <dv-border-box-11 :color="['#48abff']" title="人流量时间分布图">
                <topLeftTab />
              </dv-border-box-11>
              <div class="three-box-one">
                <dv-border-box-12>
                  <bottomLeftTab />
                </dv-border-box-12>
                <dv-border-box-12>
                  <bottomRightTab />
                </dv-border-box-12>
              </div>
            </div>
            <div class="three-box-two">
              <dv-border-box-13>
                <topRightTab />
              </dv-border-box-13>
              <dv-border-box-12>
                <rightBottomTab />
              </dv-border-box-12>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>

import Map from './map'
import topLeft from './topLeft'
import centerTop from './centerTop'
import topRight from './topRight'
import centerLeft from './centerLeft'
import centerCenter from './centerCenter'
import bottomLeft from './bottomLeft'
import centerBottom from './centerBottom'
import centerRight from './centerRight'
import bottomRight from './bottomRight'
import bottomCenterRight from './bottomCenterRight'
import bottomLeftTab from './bottomLeftTab'
import bottomRightTab from './bottomRightTab'
import topRightTab from './topRightTab'
import rightBottomTab from './rightBottomTab'
import topLeftTab from './topLeftTab'

export default {
  components: {
    Map,
    topLeft,
    centerTop,
    topRight,
    centerLeft,
    centerCenter,
    bottomLeft,
    centerBottom,
    centerRight,
    bottomRight,
    bottomCenterRight,
    bottomLeftTab,
    bottomRightTab,
    topRightTab,
    rightBottomTab,
    topLeftTab
  },
  data() {
    return {
      loading: true,
      curId: 1,
      items: [
        { item: 'GIS地图' },
        { item: '客流量统计' },
        { item: '统计分析' }
      ]
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
    },
    tab(index) {
      this.curId = index
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/index.scss';
</style>
<style scoped>
 #index{
   background: url(../../assets/backgroud.png) no-repeat 0 0;
   background-size: 100% 100%;
   box-sizing: border-box;
   padding: 10px;
   overflow: hidden;
 }
  #tab {
    width: 50%;
    margin: 0 auto .3rem;
  }

  .tab-bar {
    width: 100%;
  }
  .tab-bar a {
    float: left;
    width: 33%;
    height:0.8rem;
    line-height: 0.8rem;
    text-align: center;
    text-decoration: none;
    color: #1c4779;
    font-size: 0.35rem;
    font-weight: bold;
  }
  .active{
    color: #48abff !important;
  }
</style>
