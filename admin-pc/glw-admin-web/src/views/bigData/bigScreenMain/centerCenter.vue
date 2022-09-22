<template>
  <div id="bottomLeft">
    <div class="bg-color-blacks">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2s">各景点流量统计(人)</span>
        </div>
      </div>
      <div>
        <div style="float: right;font-weight: bold;font-size: 0.23rem;margin-right: 0.1rem;color: #48abff !important">
          接待总数:
          <count-to :start-val="0" :end-val="number" :duration="1000" class="card-panel-num" />
          人
        </div>
        <MaincenterCrenterChart />
      </div>
    </div>
  </div>
</template>

<script>
import MaincenterCrenterChart from '../../components/echart/bottom/MaincenterCrenterChart'
import { getbigData } from '@/api/bigData/dataManagement'
import CountTo from 'vue-count-to'
export default {
  components: {
    MaincenterCrenterChart,
    CountTo
  },
  data() {
    return {
      number: 0
    }
  },
  mounted() {
    const type = 9
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        for (var i = 0; i < res.data.length; i++) {
          this.number += Number(res.data[i].value)
        }
        this.suiji()
      }
    })
  },
  methods: {
    suiji() {
      setInterval(() => {
        this.number += 6
      }, 6000)
    }
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
