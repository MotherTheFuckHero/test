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
    const type = 9
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        for (var i = 0; i < res.data.length; i++) {
          this.cdata.category.push(res.data[i].name)
          this.cdata.lineData.push(res.data[i].resValue) // 当前接待
          this.cdata.barData.push(res.data[i].value) // 累计接待
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
