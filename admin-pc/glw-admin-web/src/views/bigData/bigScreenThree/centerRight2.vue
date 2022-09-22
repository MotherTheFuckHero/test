<template>
  <div id="centreRight2">
    <div class="bg-color-blacks">
      <div class="d-flex pt-2 pl-2">
        <span class="fs-xl text mx-2">消费者归属地</span>
      </div>
      <div class="d-flex jc-center" style=" margin-top: 0;">
        <dv-capsule-chart :config="config" style="width:100%;height:11.5rem" />
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
          // {
          //   name: '南阳',
          //   value: 167
          // },
          // {
          //   name: '周口',
          //   value: 67
          // },
          // {
          //   name: '漯河',
          //   value: 123
          // },
          // {
          //   name: '郑州',
          //   value: 55
          // },
          // {
          //   name: '西峡',
          //   value: 98
          // }
        ]
      }
    }
  },
  mounted() {
    const type = 22
    getbigData(type).then(res => {
      const code = res.code
      const data = []
      if (code === '0') {
        for (var i = 0; i < res.data.length; i++) {
          data.push({
            name: res.data[i].name,
            value: res.data[i].value
          })
        }
        const datas = {
          data,
          unit: '人',
          showValue: true
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
  width:5.75rem;
  border-radius: 0.0625rem;
  .bg-color-blacks {
    padding: 0.0625rem;
    height: 100%;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
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
    transform: scale(0.5,1.5);
    -ms-transform: scale(0.5,1.5);
    -webkit-transform: scale(0.5,1.5);
    -moz-transform:scale(0.5,1.5);
    -o-transform: scale(0.5,1.5);
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
