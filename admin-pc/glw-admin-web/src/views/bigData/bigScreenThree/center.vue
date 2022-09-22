<template>
  <div id="center">
    <div class="d-flex">
      <span class="fs-xl text mx-2">地方特产占比</span>
      <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
    </div>
    <div class="down">
      <div id="percent" class="percent">
        <div v-for="(item,index) in rate" :key="index" class="item">
          <CenterChart :id="item.id" :tips="item.tips" :color-obj="item.colorData" />
          <span style="font-weight: bold;font-size: 0.3rem;margin-top: 2rem !important;">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterChart from '../../components/echart/center/centerChartRate'
import { getbigData } from '@/api/bigData/dataManagement'
export default {
  components: {
    CenterChart
  },
  data() {
    return {
      rate: [
        {
          id: 'centerRate1',
          tips: 60,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: 40,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad'
              }
            }
          }
        },
        {
          id: 'centerRate1',
          tips: 60,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: 40,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad'
              }
            }
          }
        }
      ]
    }
  },
  mounted() {
    const type = 20
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        this.rate = []
        for (var i = 0; i < res.data.length; i++) {
          this.rate.push({
            id: res.data[i].id.toString(),
            name: res.data[i].name,
            tips: Number(res.data[i].value),
            colorData: {
              textStyle: '#3fc0fb',
              series: {
                color: ['#00bcd44a', 'transparent'],
                dataColor: {
                  normal: '#03a9f4',
                  shadowColor: '#97e2f5'
                }
              }
            }
          })
        }
      }
    })
    setTimeout(() => {
      this.initChartsx()
    }, 700)
  },
  methods: {
    initChartsx() {
      var ss = document.getElementById('percent').getElementsByTagName('canvas')
      for (var i = 0; i < ss.length; i++) {
        ss[i].style.height = 201 + 'px' // 因副屏分辨率问题需要单独设置图形的高度
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#center {
  padding: 0.15rem;
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
  .mx-2{
    font-size: 0.25rem;
  }
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 0.0625rem;
      padding-top: 0.2rem;
      margin-top: 0.1rem;
      width: 32%;
      height: 0.875rem;
    }
  }
  .down {
    padding: 0.07rem 0.05rem;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    /*height: 3.1875rem;*/
    justify-content: space-between;
    .ranking {
      padding: 0.125rem;
      width: 59%;
    }
    .percent {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      text-align: center;
      .item {
        width: 32%;
        height: 3.7rem;
        display: inline-block;
        margin-top: 0.7rem;
        span {
          margin-top: 0.675rem;
          display: flex;
          justify-content: center;
          transform: scale(0.5,1.5);
          -ms-transform: scale(0.5,1.5);
          -webkit-transform: scale(0.5,1.5);
          -moz-transform:scale(0.5,1.5);
          -o-transform: scale(0.5,1.5);
        }
      }
      .water {
        width: 100%;
      }
    }
  }
}
</style>
