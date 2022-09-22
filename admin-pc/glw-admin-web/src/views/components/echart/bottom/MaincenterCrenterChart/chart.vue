<template>
  <div>
    <Echart
      id="bottomLeftChart"
      :options="options"
      style="top:.6rem !important;"
      height="2.7rem"
      width="6.5rem"
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
            data: ['累计接待', '当前接待'],
            textStyle: {
              color: '#B4B4B4'
            },
            top: '-3%'
          },
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
            axisLabel: {
              interval: 0,
              rotate: '45',
              textStyle: {
                fontSize: 8
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
                  fontSize: 8
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
          dataZoom: [
            {
              id: 'dataZoomX',
              start: 0,
              end: 80,
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter'
            }
          ],
          series: [
            {
              name: '累计接待',
              type: 'bar',
              barGap: '0%',
              barCategoryGap: '10%',
              // barWidth: 20,
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
            },
            {
              name: '当前接待',
              type: 'bar',
              barGap: '0%',
              barCategoryGap: '10%',
              // barWidth: 20,
              itemStyle: {
                normal: {
                  // barBorderRadius: 5,
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
