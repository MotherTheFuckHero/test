<template>
  <div>
    <Echart
      id="bottomLeftChart"
      :options="options"
      height="3.8rem"
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
            data: ['旅客', '车辆'],
            textStyle: {
              color: '#B4B4B4'
            },
            top: '-1%'
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
                formatter: '{value} '
              }
            }
          ],
          series: [
            {
              name: '旅客',
              type: 'line',
              smooth: true,
              lineStyle: {
                // stroke: '#ff5ca9'
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)'],
                width: 4

              },
              linePoint: {
                radius: 7,
                style: {
                  fill: '#ff5ca9',
                  stroke: 'transparent'
                }
              },
              data: newData.rateData
            },

            {
              name: '车辆',
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#FFCF28',
                width: 4
              },
              linePoint: {
                radius: 7,
                style: {
                  fill: '#FB7293',
                  stroke: 'transparent'
                }
              },
              data: newData.rateDatas
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
