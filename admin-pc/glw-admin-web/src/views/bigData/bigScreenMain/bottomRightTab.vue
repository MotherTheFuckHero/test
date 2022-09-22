<template>
  <div id="bottomLeft">
    <div class="bg-color-blacks">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2s">接待车辆归属地</span>
        </div>
      </div>
      <div>
        <MainCrenterRightTabChart />
      </div>
    </div>
  </div>
</template>

<script>
import MainCrenterRightTabChart from '../../components/echart/bottom/MainCrenterRightTabChart'
export default {
  components: {
    MainCrenterRightTabChart
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  #bottomLeft {
    /*padding: 0.3rem 0.2rem;*/
    width: 100%;
    border-radius: 0.0625rem;
    .bg-color-blacks {
      border-radius: 0.125rem;
    }
    .text {
      color: #c3cbde;
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
