<template>
  <div class="top-right-cmp">
    <div class="d-flex pt-2 pl-2">
      <span style="color:#5cd9e8">
        <icon name="chart-line" />
      </span>
      <div class="d-flex">
        <span class="fs-xl text mx-2s">&#8197; 游客月流量统计(人)</span>
      </div>
    </div>
    <div style="float: right;font-weight: bold;font-size: 0.23rem;margin-right: 0.1rem;color: #48abff!important">
      总客流量:
      <count-to :start-val="0" :end-val="number" :duration="1500" class="card-panel-num" />
      人
    </div>
    <MainbottomrightChart style="margin-top:0.12rem " />
  </div>
</template>

<script>
import MainbottomrightChart from '../../components/echart/bottom/MainbottomrightChart'
import { getbigData } from '@/api/bigData/dataManagement'
import CountTo from 'vue-count-to'
export default {
  components: {
    MainbottomrightChart,
    CountTo
  },
  data() {
    return {
      number: 0
    }
  },
  mounted() {
    const type = 8
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
        this.number += 5
      }, 4000)
    }
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
