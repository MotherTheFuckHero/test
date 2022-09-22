<template>
  <div id="centreLeft1">
    <div class="bg-color-blacks">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">车辆归属地统计</span>
          <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <CentreLeft1Chart />
      </div>
    </div>
  </div>
</template>

<script>
import CentreLeft1Chart from '../../components/echart/centerLeft/centerLeft2Chart'
export default {
  components: {
    CentreLeft1Chart
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
#centreLeft1 {
  padding: 0.2rem;
  /*height: 5.125rem;*/
  /*min-width: 6.95rem;*/
  height: 100%;
  width: 100%;
  border-radius: 0.0625rem;
  .bg-color-blacks {
    height:100%;
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

  .bottom-data {
    .item-box {
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      // 金币
      .coin {
        position: absolute;
        left: 0.1rem;
        top: 0.2125rem;
        font-size: 0.25rem;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
    }
  }
}
</style>
