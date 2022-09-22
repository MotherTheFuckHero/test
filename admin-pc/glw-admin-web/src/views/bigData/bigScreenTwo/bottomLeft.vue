<template>
  <div id="bottomLeft">
    <div class="bg-color-blacks">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">综合治理信息</span>
        </div>
      </div>
      <div>
        <twobottomLeftChart />
      </div>
    </div>
  </div>
</template>

<script>
import twobottomLeftChart from '../../components/echart/bottom/twobottomLeftChart'
export default {
  components: {
    twobottomLeftChart
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
#bottomLeft {
  /*padding: 0.3rem 0.2rem;*/
  /*height: 4.5rem;*/
  /*min-width: 3.75rem;*/
  height: 100%;
  min-width:65%;
  border-radius: 0.0625rem;
  .bg-color-blacks {
    height: 6.0625rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .mx-2{
    font-size: 0.25rem;
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
