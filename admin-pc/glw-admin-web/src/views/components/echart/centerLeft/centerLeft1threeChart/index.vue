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
        xData: ['rose122', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6'],
        seriesData: [
          { value: 10, name: 'rose122' },
          { value: 5, name: 'rose2' },
          { value: 15, name: 'rose3' },
          { value: 25, name: 'rose4' },
          { value: 20, name: 'rose5' },
          { value: 35, name: 'rose6' }
        ]
      }
    }
  },
  mounted() {
    const type = 20
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        this.cdata.seriesData = res.data
        for (var i = 0; i < res.data.length; i++) {
          this.cdata.xData.push(res.data[i].name)
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
