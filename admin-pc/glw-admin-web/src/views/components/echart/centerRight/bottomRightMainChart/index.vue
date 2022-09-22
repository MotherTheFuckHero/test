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
        // xData: ['rose122', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6'],
        xData: {},
        seriesData: [
        ]
      }
    }
  },
  mounted() {
    const type = 13
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        // this.cdata.seriesData = res.data
        for (var i = 0; i < res.data.length; i++) {
          const name = res.data[i].name
          this.cdata.seriesData.push({
            name: res.data[i].name.substring(0, 6),
            value: res.data[i].value
          })
          this.cdata.xData[name] = i < 6
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
