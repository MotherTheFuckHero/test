<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import { getbigData } from '@/api/bigData/dataManagement'
export default {
  components: {
    Chart
  },
  data() {
    return {
      drawTiming: null,
      cdata: {
        year: null,
        weekCategory: [],
        radarData: [],
        radarDataAvg: [],
        maxData: 12000,
        weekMaxData: [],
        weekLineData: []
      }
    }
  },
  mounted() {
    this.drawTimingFn()
  },
  methods: {
    drawTimingFn() {
      this.setData()
    },
    setData() {
      // 折线图数据
      const dateBase = new Date()
      this.cdata.year = dateBase.getFullYear()
      var distance = ''
      const type = 10
      getbigData(type).then(res => {
        const code = res.code
        if (code === '0') {
          for (var i = 0; i < res.data.length; i++) {
            distance = Number(res.data[i].value)
            this.cdata.weekLineData.push(distance)
          }
          this.cdata.maxData = Math.max.apply(null, this.cdata.weekLineData)
        }
      })
      this.cdata.weekMaxData.push(this.cdata.maxData)
      // 周数据
      for (let i = 0; i < 7; i++) {
        // 日期
        // const date = new Date()
        // this.cdata.weekCategory.unshift([date.getMonth() + 1, date.getDate() - i].join('/'))
        this.cdata.weekCategory = ['10-27', '10-28', '10-29', '10-30', '10-31', '11-01', '11-02']
        // // 雷达图数据
        const averageSpeed = +(Math.random() * 5 + 4).toFixed(2) // 产品质量
        const newdistance = (averageSpeed + 1).toFixed(2) // 服务态度
        const maxSpeed = (Math.random() * 3 + 4).toFixed(2) // 服务效率
        const hour = (averageSpeed - 1).toFixed(2) // 房间设施
        const radarDayData = [newdistance, averageSpeed, maxSpeed, hour]
        this.cdata.radarData.unshift(radarDayData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
