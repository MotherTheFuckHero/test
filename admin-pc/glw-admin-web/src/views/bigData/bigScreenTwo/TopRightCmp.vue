<template>
  <div class="top-right-cmp">
    <div class="d-flex pt-2 pl-2">
      <span style="color:#5cd9e8">
        <icon name="chart-line" />
      </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2">日客流量统计</span>
      </div>
    </div>
    <twobottomrightChart style="margin-top:0.12rem " />
  </div>
</template>

<script>
import twobottomrightChart from '../../components/echart/bottom/twobottomrightChart'
export default {
  components: {
    twobottomrightChart
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
.top-right-cmp {
  position: relative;
  padding: 0.0625rem;
  height:100%;
  box-sizing: border-box;
}
.mx-2{
  font-size: 0.25rem;
}
</style>
