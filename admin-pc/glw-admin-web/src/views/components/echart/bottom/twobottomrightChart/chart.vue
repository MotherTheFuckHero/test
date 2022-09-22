<template>
  <div>
    <Echart
      id="bottomLeftChart"
      :options="options"
      height="13.6rem"
      width="5.2rem"
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
            data: [''],
            textStyle: {
              color: '#B4B4B4'
            },
            top: '0%'
          },
          grid: {
            x: '16%',
            width: '84%',
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
            }
          ],
          series: [
            {
              name: '日客流量',
              type: 'line',
              smooth: false,
              lineStyle: {
                // stroke: '#ff5ca9'
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
              },
              linePoint: {
                radius: 4,
                style: {
                  fill: '#ff5ca9',
                  stroke: 'transparent'
                }
              },
              data: newData.rateData
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
