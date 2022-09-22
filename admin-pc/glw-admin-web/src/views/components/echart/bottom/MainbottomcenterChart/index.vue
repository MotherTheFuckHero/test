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
        category: [],
        rateDatas: [],
        rateData: []
      }
    }
  },
  mounted() {
    this.setData()
  },
  methods: {
    // 根据自己的业务情况修改
    setData() {
      const type = 10
      getbigData(type).then(res => {
        const code = res.code
        if (code === '0') {
          for (var i = 0; i < res.data.length; i++) {
            // this.cdata.category.push(res.data[i].name)
            this.cdata.rateData.push(res.data[i].value)
            this.cdata.rateDatas.push(res.data[i].resValue)
          }
        }
      })
      // 周数据
      var myDate = new Date() // 获取今天日期
      myDate.setDate(myDate.getDate() - 6)
      var dateArray = []
      var dateTemp
      var flag = 1
      for (var i = 0; i < 7; i++) {
        dateTemp = (myDate.getMonth() + 1) + '-' + myDate.getDate()
        dateArray.push(dateTemp)
        myDate.setDate(myDate.getDate() + flag)
      }
      this.cdata.category = dateArray
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
