<template>
  <div id="bottomLeft">
    <div class="d-flex">
      <span class="fs-xl text mx-2">旅游性别比例统计</span>
    </div>
    <div class="d-flex jc-center">
      <centerLeft2threeChart />
    </div>
  </div>
</template>

<script>
import centerLeft2threeChart from '../../components/echart/centerLeft/centerLeft2threeChart'
export default {
  components: {
    centerLeft2threeChart
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
  height:100%;
  width: 100%;
  border-radius: 0.0625rem;
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
