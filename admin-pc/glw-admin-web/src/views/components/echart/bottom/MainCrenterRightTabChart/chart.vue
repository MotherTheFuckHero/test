<template>
  <div>
    <Echart
      id="bottomLeftChart"
      :options="options"
      style="top:.4rem !important;"
      width="5rem"
    />
  </div>
</template>

<script>
import Echart from '../../../../common/echart'
export default {
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.1)',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#7B7DDC'
              }
            }
          },
          // legend: {
          //   data: [],
          //   textStyle: {
          //     color: '#B4B4B4'
          //   },
          //   top: '-2%'
          // },
          grid: {
            x: '12%',
            width: '88%',
            y: '4%'
          },
          xAxis: {
            data: newData.category,
            axisLine: {
              lineStyle: {
                color: '#B4B4B4'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [
            {
              splitLine: { show: true },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  fontSize: 8
                }
              }
            }

          ],
          series: [
            {
              name: '接待车辆',
              type: 'bar',
              barWidth: 20,
              itemStyle: {
                normal: {
                  // barBorderRadius: 5,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2481FF' },
                    { offset: 1, color: '#2481FF' }
                  ])
                }
              },
              data: newData.barData
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
