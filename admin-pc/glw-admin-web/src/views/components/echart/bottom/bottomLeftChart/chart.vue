<template>
  <div>
    <!-- 年度开工率 -->
    <Echart
      id="bottomLeftChart"
      :options="options"
      height="15rem"
      width="100%"
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
          legend: {
            // data: ['订单量', '退单量', '成交率'],
            data: ['订单量', '退单量'],
            textStyle: {
              color: '#B4B4B4',
              fontSize: 18
            },
            top: '0%'
          },
          grid: {
            x: '7%',
            width: '93%',
            y: '4%'
          },
          xAxis: {
            data: newData.category,
            axisLine: {
              lineStyle: {
                color: '#B4B4B4'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 18
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },

              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  fontSize: 18
                }
              }
            },
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
          series: [
            // {
            //   name: '成交率',
            //   type: 'line',
            //   smooth: true,
            //   showAllSymbol: true,
            //   symbol: 'emptyCircle',
            //   symbolSize: 10,
            //   yAxisIndex: 1,
            //   itemStyle: {
            //     normal: {
            //       color: '#F02FC2'
            //     }
            //   },
            //   lineStyle: {
            //     normal: {
            //       width: 5
            //     }
            //   },
            //   data: newData.rateData
            // },
            {
              name: '订单量',
              type: 'bar',
              barWidth: 23,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2481FF' },
                    { offset: 1, color: '#2481FF' }
                  ])
                }
              },
              data: newData.barData
            },
            {
              name: '退单量',
              type: 'bar',
              barGap: '-100%',
              barWidth: 23,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(26,255,253,1)' },
                    { offset: 0.2, color: 'rgba(26,255,253,1)' },
                    { offset: 1, color: 'rgba(26,255,253,1)' }
                  ])
                }
              },
              // z: -12,
              data: newData.lineData
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
