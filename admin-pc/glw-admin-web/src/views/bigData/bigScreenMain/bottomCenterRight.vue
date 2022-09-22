<template>
  <div id="centreRight2">
    <div class="bg-color-blacks">
      <div class="d-flex pt-2 pl-2">
        <span class="fs-xl text mx-2s">消费者归属地</span>
        <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
      </div>
      <div class="d-flex jc-center" style="margin-top: 0;">
        <dv-conical-column-chart :config="config" style="width:5rem;height:2.5rem" />
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
          img: [require("../../assets/car.png")],
          columnColor: 'rgba(72, 171, 255, 0.5)',
          // unit: '人',
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
    border-radius: 0.0625rem;
    .bg-color-blacks {
      padding: 0.0625rem;
      border-radius: 0.125rem;
    }
    .text {
      color: #c3cbde;
    }
    .body-box {
      /*border-radius: 0.125rem;*/
      overflow: hidden;
    }
    .bottom-data {
      .item-box {
        float: right;
        position: relative;
        width: 100%;
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
