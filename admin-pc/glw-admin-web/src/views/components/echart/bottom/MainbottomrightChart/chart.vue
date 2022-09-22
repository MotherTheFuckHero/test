<template>
  <div>
    <Echart
      id="bottomLeftChart"
      :options="options"
      height="3.7rem"
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
            data: [''],
            textStyle: {
              color: '#B4B4B4'
            },
            top: '0%'
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
            }
          ],
          series: [
            {
              name: '月客流量',
              type: 'line',
              smooth: false,
              areaStyle: {
                normal: {
                  color: {
                    x: 1,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'red' // 0% 处的颜色
                    }, {
                      offset: 0.7,
                      color: 'rgba(255, 0, 0, 0)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              lineStyle: {
                // stroke: '#ff5ca9'
                color: 'red',
                gradient: ['rgba(255, 0, 0, 0.6)', 'rgba(255, 0, 0, 0)']
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
