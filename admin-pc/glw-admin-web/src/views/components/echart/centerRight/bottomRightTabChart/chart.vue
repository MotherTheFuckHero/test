<template>
  <div>
    <Echart
      id="centreLeft1Chart"
      :options="options"
      width="5.25rem"
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
            '#CD00CD',
            '#56DFA4',
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
          toolbox: {
            show: true
          },
          calculable: true,
          legend: {
            orient: 'horizontal',
            icon: 'circle',
            bottom: 0,
            show: false,
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
              radius: [30, 40],
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
                  labelLine: { show: true }
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
