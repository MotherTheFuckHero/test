<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '580px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (val) {
          this.setOptions(val)
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ orderDatePrices, orderDateCounts, userDateCounts, footDataCounts } = {}) {
      if (orderDatePrices !== undefined) {
        //  日期
        var days = [
          // '2021-01','2021-02','2021-03','2021-04','2021-05','2021-06','2021-07','2021-11-08','2021-11-09','2021-11-10','2021-11-11','2021-11-12','2021-11-13','2021-11-14','2021-11-15','2021-11-16','2021-11-17','2021-11-18','2021-11-19','2021-11-20','2021-11-21','2021-11-22','2021-11-23','2021-11-24','2021-11-25','2021-11-26','2021-11-27','2021-11-28','2021-11-29','2021-11-30'/*,'2021-10-31'*/
        ]
        //  每日营业额
        var prices = [
          8780, 5380, 4380, 8580, 5600, 8610, 8324, 9080, 5580, 5791, 8838, 8280, 5951, 8233, 7833, 8385, 11216, 8560,13460, 9760, 11696, 11894, 11960, 9790, 11360, 5260, 13032, 12200, 6156, 11016, 5490
        ]
        // 每日订单量
        var orderCounts = [
          213, 313, 162, 190, 120, 321, 212, 230, 244, 321, 315, 216, 412, 223, 203, 315, 127, 413, 445, 418, 139, 225, 265, 219, 461, 213, 310, 310, 243, 324, 111
        ]

        //  每日活跃用户数
        var userCounts = [
          11320, 12330, 13612, 14390, 15240, 17616, 15170, 16200, 19442, 16231, 11522, 11632, 14520, 12430, 16608, 13350, 21735, 14140, 21495, 11580, 16795, 17956, 15465, 13798, 20410, 12353, 23910, 15410, 12539, 19543, 11412
        ]
        // var footprintCounts = []

        orderDatePrices.filter(item => {
          days.push(item.date)
          prices.push(item.price)
        })
        // orderDateCounts.filter(item => {
        //   orderCounts.push(item.count)
        // })
        // userDateCounts.filter(item => {
        //   userCounts.push(item.count)
        // })

        // footprintDateCounts.filter(item => {
        //   footprintCounts.push(item.count)
        // })
        this.chart.setOption({
          xAxis: {
            data: days,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: '45'
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['交易金额', '订单数量', '活跃用户数']//, '浏览数量', '收藏数量'
          },
          series: [{
            name: '交易金额',
            smooth: false,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 3
                },
                areaStyle: {
                  color: '#FF005A'
                }
              }
            },
            data: prices,
            animationDuration: 2800,
            animationEasing: 'quadraticOut',
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                color: 'black',
                fontSize: 12
              },
              formatter: function(v) {
                return (v.value) + '元'
              }
            }
          },
          {
            name: '订单数量',
            smooth: false,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF4949',
                lineStyle: {
                  color: '#FF4949',
                  width: 3
                },
                areaStyle: {
                  color: '#FF4949'
                }
              }
            },
            data: orderCounts,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: '活跃用户数',
            smooth: false,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 3
                },
                areaStyle: {
                  color: '#3888fa'
                }
              }
            },
            data: userCounts,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
          // {
          //   name: '收藏数量',
          //   smooth: true,
          //   type: 'line',
          //   itemStyle: {
          //     normal: {
          //       color: '#b2d235',
          //       lineStyle: {
          //         color: '#b2d235',
          //         width: 2
          //       },
          //       areaStyle: {
          //         color: '#b2d235'
          //       }
          //     }
          //   },
          //   data: favoriteCounts,
          //   animationDuration: 2800,
          //   animationEasing: 'quadraticOut'
          // }
          ]
        })
      }
    }
  }
}
</script>
