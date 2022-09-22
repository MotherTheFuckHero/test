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
          // '12a', '1a', '2a', '3a', '4a', '5a', '6a',
          // '7a', '8a', '9a','10a','11a',
          // '12p', '1p', '2p', '3p', '4p', '5p',
          // '6p', '7p', '8p', '9p', '10p', '11p'
        ],
        lineData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        barData: [
          // [0,0,10],[0,1,1],[0,2,4],[2,3,5],[0,4,3],[0,5,4],[3,6,0]
        ],
        maxData: 1100
      }
    }
  },
  mounted() {
    const type = 2
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        let newD = []
        const newName = []
        const maxValue = []
        for (var i = 0; i < res.data.length; i++) {
          newName.push(res.data[i].name)
          maxValue.push(res.data[i].resValue)
          this.cdata.category = Array.from(new Set(newName)) /* 去重*/
          newD = [Number(res.data[i].week), Number(res.data[i].value), Number(res.data[i].resValue)] // week=x  value=y resValue=z
          this.cdata.barData.push(newD)
        }
        this.cdata.maxData = Math.max.apply(null, maxValue)
        this.cdata.maxData += 20
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
