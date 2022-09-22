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
      cdata: {
        category: [
        ],
        lineData: [
        ],
        barData: [
        ]
      }
    }
  },
  mounted() {
    const type = 14
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        for (var i = 0; i < res.data.length; i++) {
          this.cdata.category.push(res.data[i].week)
          this.cdata.lineData.push(res.data[i].resValue) // 人脸抓拍
          this.cdata.barData.push(res.data[i].value) // 车辆抓拍
        }
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
