<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2" style="margin: 0.4rem 0;">营销数据</span>
        </div>
      </div>
      <div class="d-flex jc-center">
        <dv-scroll-board :config="config" style="width:100%;height:14rem" />
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
      }
    }
  },
  mounted() {
    const type = 19
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        var newD = []
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].newList = []
          res.data[i].newList.push(res.data[i].name, res.data[i].value + '%', res.data[i].week)
          newD.push(res.data[i].newList)
        }
        this.config = {
          data: newD, // 表数据
          header: ['名称', '同比', '数量'], // 表头数据
          rowNum: 5, // 表格行数
          headerHeight: 105,
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
  /*height: 5.125rem;*/
  /*min-width: 7.85rem;*/
  //min-width: 30%;
  border-radius: 0.0625rem;
  .bg-color-black {
    /*height: 4.8125rem;*/
    width: 100%;
    border-radius: 0.125rem;
  }
  .mx-2{
    font-size: 0.25rem;
  }
  .dv-scroll-board .header{
    font-size: 0.25rem;
  }
  .row-item{
    font-size: 0.2rem;
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
