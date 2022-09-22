<template>
  <div style="position: relative">
    <Echart
      id="centreLeft1Chartx"
      :options="options"
      height="11.5rem"
      width="8.5rem"
    />
    <!-- 4个主要的数据 -->
    <div class="bottom-data" style="height:auto;position: absolute;top:75%;">
      <div v-for="(item,index) in numberData" :key="index" class="item-box" style="text-align: center;">
        <div class="d-flex">
          <dv-digital-flop :config="item.number" style="width:100%;height:1.25rem;" />
        </div>
        <p class="text" style="text-align: center;font-size: .3rem;line-height:.825rem ">
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Echart from '../../../../common/echart'
import { getbigData } from '@/api/bigData/dataManagement'
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
      options: {},
      numberData: []
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          color: [
            '#fb7293',
            '#e7bcf3',
            '#37a2da',
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
          // legend: {
          //   orient: 'horizontal',
          //   icon: 'circle',
          //   bottom: 130,
          //   x: 'center',
          //   data: newData.xData,
          //   textStyle: {
          //     color: '#fff'
          //   }
          // },
          series: [
            {
              name: '占比率统计',
              type: 'pie',
              radius: [10, 80],
              roseType: 'area',
              center: ['50%', '47%'],
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
    const type = 24
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        for (var i = 0; i < res.data.length; i++) {
          this.numberData.push({
            number: {
              toFixed: 2,
              content: res.data[i].value
            },
            text: res.data[i].name
          })
        }
      }
    })
  },
  methods: {
    initChartsx() {
      var ss = document.getElementById('centreLeft1Chartx').getElementsByTagName('canvas')[0]
      ss.style.height = 1500 + 'px' // 因副屏分辨率问题需要单独设置图形的高度
      ss.style.top = -450 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-data {
  .item-box {
    float: right;
    position: relative;
    width: 50%;
    margin-bottom: 0.7rem;
    color: #d3d6dd;
    transform: scale(0.8,1.4);
    -ms-transform: scale(0.8,1.4);
    -webkit-transform: scale(0.8,1.4);
    -moz-transform:scale(0.8,1.4);
    -o-transform: scale(0.8,1.4);
    // 金币
    .coin {
      position: absolute;
      left: 0.1rem;
      top: 0.2125rem;
      font-size: 0.25rem;
      color: #ffc107;
    }
    .colorYellow {
      color: yellowgreen;
    }
  }
}
</style>
