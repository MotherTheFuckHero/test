<template>
  <div id="bottomLeft">
    <div class="bg-color-blacks">
      <div>
        <MainTopLeftChart />
      </div>
    </div>
  </div>
</template>

<script>
import MainTopLeftChart from '../../components/echart/bottom/MainTopLeftChart'
export default {
  components: {
    MainTopLeftChart
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
