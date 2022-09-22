<template>
  <div id="centreRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="align-left" />
        </span>
        <span class="fs-xl text mx-2">销售统计</span>
      </div>
      <div class="d-flex jc-center body-boxx" style=" margin-top: 0;">
        <dv-capsule-chart :config="config" style="width: 100%;height:10.5rem;" />
        <!-- 4个主要的数据 -->
        <div class="bottom-data">
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
    </div>
  </div>
</template>

<script>
import { getbigData } from '@/api/bigData/dataManagement'
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '南阳',
            value: 167
          },
          {
            name: '周口',
            value: 67
          },
          {
            name: '漯河',
            value: 123
          },
          {
            name: '郑州',
            value: 55
          },
          {
            name: '西峡',
            value: 98
          }
        ]
      },
      numberData: [
      ]
    }
  },
  // components: { centreRight2Chart1 },
  mounted() {
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
    const types = 19
    getbigData(types).then(res => {
      const code = res.code
      const data = []
      if (code === '0') {
        for (var i = 0; i < res.data.length; i++) {
          data.push({
            name: res.data[i].name,
            value: res.data[i].resValue
          })
        }
        const datas = {
          data
          // showValue: true
        }
        this.config = datas
      }
    })
  },
  methods: {}
}
</script>

<style lang="scss">
#centreRight2 {
  padding: 0.0625rem;
  height: 100%;
  min-width:6.75rem;
  //width:8.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    padding: 0.0625rem;
    height: 99%;
    border-radius: 0.125rem;
  }
  .mx-2{
    font-size: 0.25rem;
  }
  .capsule-item{
    height: 0.25rem;
    margin: 0;
  }
  .capsule-item-column{
    height: 100%;
  }
  .dv-capsule-chart .label-column div{
    font-size: 0.2rem;
    transform: scale(0.9,1.5);
    -ms-transform: scale(0.9,1.5);
    -webkit-transform: scale(0.9,1.5);
    -moz-transform:scale(0.9,1.5);
    -o-transform: scale(0.9,1.5);
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
  .bottom-data {
    .item-box {
      float: right;
      position: relative;
      width: 50%;
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
}
</style>
