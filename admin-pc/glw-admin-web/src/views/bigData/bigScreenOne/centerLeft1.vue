<template>
  <div id="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">项目占比</span>
          <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <CentreLeft1Chart />
      </div>
    </div>
  </div>
</template>

<script>
import CentreLeft1Chart from '../../components/echart/centerLeft/centerLeft1Chart'
export default {
  components: {
    CentreLeft1Chart
  },
  data() {
    return {
      config: {
        lineWidth: 30,
        activeRadius: '80%',
        radius: '75%',
        activeTimeGap: 2000,
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          }
        ]
      },
      numberData: [
        {
          number: {
            number: [15],
            toFixed: 1,
            content: '{nt}'
          },
          text: '今日构建总量'
        },
        {
          number: {
            number: [1144],
            toFixed: 1,
            content: '{nt}'
          },
          text: '总共完成数量'
        },
        {
          number: {
            number: [361],
            toFixed: 1,
            content: '{nt}'
          },
          text: '正在编译数量'
        },
        {
          number: {
            number: [157],
            toFixed: 1,
            content: '{nt}'
          },
          text: '未通过数量'
        }
      ]
    }
  },
  mounted() {
    this.changeTiming()
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        this.changeNumber()
      }, 3000)
    },
    changeNumber() {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index
        item.number = { ...item.number }
      })
    }
  }
}
</script>

<style lang="scss">
#centreLeft1 {
  padding: 0.2rem;
  ///*height: 5.125rem;*/
  /*min-width: 6.95rem;*/
  height: 100%;
  min-width:30%;
  border-radius: 0.0625rem;
  .bg-color-black {
    /*height: 4.8125rem;*/
    height: 99%;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .mx-2{
    font-size: 0.25rem;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
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
