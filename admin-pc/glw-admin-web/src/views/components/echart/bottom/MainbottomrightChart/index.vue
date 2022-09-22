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
      const type = 8
      getbigData(type).then(res => {
        const code = res.code
        if (code === '0') {
          for (var i = 0; i < res.data.length; i++) {
            this.cdata.category.push(res.data[i].name)
            this.cdata.rateData.push(res.data[i].value)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
