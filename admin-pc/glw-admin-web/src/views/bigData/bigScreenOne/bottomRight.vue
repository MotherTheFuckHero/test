<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-area" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">近7天景点酒店流量统计（停用）</span>
          <div class="decoration2">
            <dv-decoration-2 :reverse="true" style="width:5px;height:14.5rem;" />
          </div>
        </div>
      </div>
      <div>
        <BottomRightChart />
      </div>
    </div>
  </div>
</template>

<script>
import BottomRightChart from '../../components/echart/bottom/bottomRightChart'
export default {
  components: {
    BottomRightChart
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
#bottomRight {
  padding: 0.2rem 0.2rem 0;
  /*height: 6.5rem;*/
  /*min-width: 3.75rem;*/
  height:100%;
  min-width: 50%;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 98%;
    border-radius: 0.125rem;
  }
  .mx-2{
    font-size: 0.25rem;
  }
  .text {
    color: #c3cbde;
  } //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
}
</style>
