<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  components: {
    Chart
  },
  data() {
    return {
      cdata: {
        indicatorData: [
          { name: 'data1', max: 300 },
          { name: 'data2', max: 250 },
          { name: 'data3', max: 300 },
          { name: 'data4', max: 5 },
          { name: 'data5', max: 200 },
          { name: 'data6', max: 100 }
        ],
        dataBJ: [
          [94, 69, 114, 2.08, 73, 39, 22],
          [99, 73, 110, 2.43, 76, 48, 23],
          [31, 12, 30, 0.5, 32, 16, 24],
          [42, 27, 43, 1, 53, 22, 25],
          [154, 117, 157, 3.05, 92, 58, 26],
          [234, 185, 230, 4.09, 123, 69, 27],
          [160, 120, 186, 2.77, 91, 50, 28]
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
