<template>
  <div>
    <Echart
      id="bottomLeftChart"
      :options="options"
      height="7.5rem"
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
          tooltip: {},
          visualMap: {
            max: newData.maxData, // 最大数
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          xAxis3D: {
            type: 'category',
            data: newData.category,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          yAxis3D: {
            type: 'category',
            data: newData.lineData,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          zAxis3D: {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid3D: {
            show: true,
            boxWidth: 200,
            boxDepth: 100,
            viewControl: {
              beta: 5 // 角度
            },
            light: {
              main: {
                intensity: 1.2,
                shadow: true
              },
              ambient: {
                intensity: 0.3
              }
            }
          },
          series: [{ // 伪类显示
            type: 'bar3D',
            name: '时间人流量',
            data: newData.barData.map(function(item) {
              return {
                name: ['人流量'],
                value: [item[1], item[0], item[2]]
              }
            }),
            shading: 'lambert',
            // barSize:14,  //宽度

            label: {
              fontSize: 16,
              color: '#ffffff',
              borderWidth: 2
            },

            emphasis: { // 高亮样式
              label: {
                fontSize: 20,
                color: '#900'
              },
              itemStyle: {
                color: '#48abff'
              }
            }
          }]
        }
      },
      immediate: false,
      deep: true
    }
  }
}
</script>
