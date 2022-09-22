<template>
  <div>
    <Echart
      id="centreLeft1Chartss"
      :options="options"
      height="14.3rem"
      width="7.25rem"
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
            '#37a2da',
            '#32c5e9',
            '#9fe6b8',
            '#ffdb5c',
            '#ff9f7f',
            '#fb7293',
            '#e7bcf3',
            '#8378ea'
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            show: true
          },
          calculable: true,
          legend: {
            orient: 'horizontal',
            icon: 'circle',
            bottom: 300,
            x: 'center',
            data: newData.xData,
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '占比率',
              type: 'pie',
              radius: [15, 90],
              roseType: 'area',
              center: ['50%', '38%'],
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
                    formatter: '{b}({d}%)'
                  },
                  labelLine: { show: true } // 分支线
                }
              }
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.initChartsx()
  },
  methods: {
    initChartsx() {
      // 初始化echart
      var sss = document.getElementById('centreLeft1Chartss').getElementsByTagName('canvas')[0]
      sss.style.height = 1900 + 'px' // 因副屏分辨率问题需要单独设置图形的高度
      sss.style.top = -400 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
