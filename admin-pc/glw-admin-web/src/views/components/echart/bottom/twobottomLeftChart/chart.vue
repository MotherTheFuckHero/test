<template>
  <div>
    <!-- 年度开工率 -->
    <Echart
      id="bottomLeftChart"
      :options="options"
      height="12rem"
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
            data: ['车辆抓拍', '人脸抓拍'],
            textStyle: {
              color: '#B4B4B4'
            },
            top: '-1%'
          },
          grid: {
            x: '11%',
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
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisLabel: {
                formatter: '{value} '
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
            {
              name: '车辆抓拍',
              type: 'bar',
              barWidth: 15,
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
              name: '人脸抓拍',
              type: 'bar',
              barGap: '5%',
              barWidth: 15,
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
