<template>
  <div class="top-right-cmp">
    <div class="d-flex pt-2 pl-2">
      <span style="color:#5cd9e8">
        <icon name="chart-line" />
      </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2s">&#8197;近7天景区、酒店流量统计（人/车）</span>
      </div>
    </div>
    <MainbottomcenterChart style="margin-top:0.12rem " />
  </div>
</template>

<script>
import MainbottomcenterChart from '../../components/echart/bottom/MainbottomcenterChart'
export default {
  components: {
    MainbottomcenterChart
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

<style scoped>
  .top-right-cmp {
    position: relative;
    padding: 0.125rem;
    height:4.1rem;
    box-sizing: border-box;
  }
  .card-panel-num{
    color: #0febff;
    font-size: 0.3rem;
  }
</style>
