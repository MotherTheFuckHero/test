<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">项目投入量</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:9rem;height:14.5rem" />
      </div>
    </div>
  </div>
</template>

<script>
import { getbigData } from '@/api/bigData/dataManagement'
export default {
  components: {},
  data() {
    return {
      config: {
        header: ['项目名称', '建设年限', '总投资', '已投资'],
        data: [
        ],
        rowNum: 7, // 表格行数
        headerHeight: 35,
        headerBGC: '#0f1325', // 表头
        oddRowBGC: '#0f1325', // 奇数行
        evenRowBGC: '#171c33', // 偶数行
        index: true,
        columnWidth: [50],
        align: ['center']
      }
    }
  },
  mounted() {
    const type = 31
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        var newD = []
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].newList = []
          res.data[i].newList.push(res.data[i].name, res.data[i].value, res.data[i].week, res.data[i].resValue + '亿')
          newD.push(res.data[i].newList)
        }
        this.config = {
          data: newD, // 表数据
          header: ['项目名称', '建设年限', '总投资', '已投资'], // 表头数据
          rowNum: 5, // 表格行数
          headerHeight: 55,
          headerBGC: '#0f1325', // 表头
          oddRowBGC: '#0f1325', // 奇数行
          evenRowBGC: '#171c33', // 偶数行
          index: true,
          columnWidth: [50],
          align: ['center']
        }
      }
    })
  },
  methods: {}
}
</script>

<style lang="scss">
#centreRight1 {

  padding: 0.2rem;
  height: 100%;
  /*min-width: 7.85rem;*/
  width: 100%;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 100%;
    border-radius: 0.125rem;
  }
  .mx-2{
    font-size: 0.2rem;
  }
  .dv-scroll-board .header{
    font-size: 0.25rem;
  }
  .row-item{
    font-size: 0.15rem;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
  .ceil{
    transform: scale(1,2.5);
    -ms-transform: scale(1,2.5);
    -webkit-transform: scale(1,2.5);
    -moz-transform: scale(1,2.5);
    -o-transform: scale(1,2.5);
  }
  .header-item{
    transform: scale(1,2.5);
    -ms-transform: scale(1,2.5);
    -webkit-transform: scale(1,2.5);
    -moz-transform: scale(1,2.5);
    -o-transform: scale(1,2.5);
  }
}
</style>
