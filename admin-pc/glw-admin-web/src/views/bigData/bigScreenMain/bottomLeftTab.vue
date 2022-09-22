<template>
  <div id="bottomLeft">
    <div class="d-flex">
      <span class="fs-xl text mx-2s">警情分析统计</span>
      <dv-decoration-1 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
    </div>
    <div class="d-flex jc-center">
      <bottomRightTabChart />
    </div>
  </div>
</template>

<script>
import bottomRightTabChart from '../../components/echart/centerRight/bottomRightTabChart'
export default {
  components: {
    bottomRightTabChart
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
  padding: 0.3rem 0.2rem;
  width: 100%;
  border-radius: 0.0625rem;
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
