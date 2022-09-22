<template>
  <div>
    <Echart
      id="centreLeft1Chart"
      :options="options"
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
          color: [
            '#FF0000',
            '#EFCC4E',
            '#e7bcf3',
            '#32c5e9',
            '#9fe6b8',
            '#ffdb5c',
            '#ff9f7f',
            '#8378ea'
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // toolbox: {
          //   show: true
          // },
          // calculable: true,
          // legend: {
          //   orient: 'horizontal',
          //   icon: 'circle',
          //   bottom: 0,
          //   show: false,
          //   type:"scroll",
          //   x: 'right',
          //   slected: newData.selected,
          //   // data: newData.xData,
          //   textStyle: {
          //     color: '#fff'
          //   }
          // },
          // series: [
          //   {
          //     name: '占比率',
          //     type: 'pie',
          //     radius: [10, 40],
          //     // roseType: 'area',
          //     center: ['49%', '50%'],
          //     data: newData.seriesData,
          //     labelLine: {
          //       normal: {
          //         length: 1
          //       }
          //     },
          //     itemStyle: {
          //       normal: {
          //         label: {
          //           show: true,
          //           formatter: '{b}({d}%)'
          //         },
          //         labelLine: { show: true }
          //       }
          //     }
          //   }
          // ]
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 0,
            top: 20,
            bottom: 20,
            selected: newData.xData
          },
          series: [
            {
              name: '占比率',
              type: 'pie',
              radius: '50%',
              center: ['30%', '45%'],
              data: newData.seriesData,
              labelLine: {
                normal: {
                  length: 1
                }
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: '{b}'
                  },
                  labelLine: { show: true }
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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

<style lang="scss" scoped>
</style>
