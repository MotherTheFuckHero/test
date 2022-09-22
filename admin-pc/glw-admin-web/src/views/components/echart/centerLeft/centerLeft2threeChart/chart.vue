<template>
  <div>
    <Echart
      id="centreLeft1Charts"
      :options="options"
      height="11.35rem"
      width="5.3rem"
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
            '#fb7293',
            '#37a2da',
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
          toolbox: {
            show: true
          },
          calculable: true,
          legend: {
            orient: 'horizontal',
            icon: 'circle',
            bottom: 0,
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
              radius: [10, 70],
              // roseType: 'area',
              center: ['50%', '50%'],
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

      var s = document.getElementById('centreLeft1Charts').getElementsByTagName('canvas')[0]
      s.style.height = 1800 + 'px' // 因副屏分辨率问题需要单独设置图形的高度
      s.style.top = -550 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
