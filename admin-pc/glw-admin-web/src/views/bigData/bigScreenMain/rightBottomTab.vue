<template>
  <div id="centreRight1" style="height:5rem">
    <div class="d-flex pt-2 pl-2">
      <div class="d-flex">
        <span class="fs-xl text mx-2s">景区接待统计</span>
      </div>
    </div>
    <div class="d-flex jc-center body-box">
      <dv-scroll-board :config="config" style="width:6rem;height:4.9rem" />
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
        header: ['项目名称', '建设年限', '总投资（亿元）'],
        data: [
          // ["组件1", "dev-1", "<span  class='colorGrass'>↑75%</span>"],
          // ["组件2", "dev-2", "<span  class='colorRed'>↓33%</span>"],
          // ["组件3", "dev-3", "<span  class='colorGrass'>↑100%</span>"],
          // ["组件4", "rea-1", "<span  class='colorGrass'>↑94%</span>"],
          // ["组件5", "rea-2", "<span  class='colorGrass'>↑95%</span>"],
          // ["组件6", "fix-2", "<span  class='colorGrass'>↑63%</span>"],
          // ["组件7", "fix-4", "<span  class='colorGrass'>↑84%</span>"],
          // ["组件8", "fix-7", "<span  class='colorRed'>↓46%</span>"],
          // ["组件9", "dev-2", "<span  class='colorRed'>↓13%</span>"],
          // ["组件10", "dev-9", "<span  class='colorGrass'>↑76%</span>"]
        ],
        rowNum: 6, // 表格行数
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
    const type = 9
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        var newD = []
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].newList = []
          res.data[i].newList.push(res.data[i].name, res.data[i].value, res.data[i].resValue)
          newD.push(res.data[i].newList)
        }
        this.config = {
          data: newD, // 表数据
          header: ['地点', '接待总人数', '当前人数'], // 表头数据
          rowNum: 5, // 表格行数
          headerHeight: 35,
          headerBGC: 'rgba(72,171,255,0.05)', // 表头
          oddRowBGC: 'rgba(72,171,255,0.1)', // 奇数行
          evenRowBGC: 'rgba(72,171,255,0.05)', // 偶数行
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
  width:100%;
  border-radius: 0.0625rem;
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>
