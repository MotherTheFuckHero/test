<template>
  <div id="bottomLefts">
    <div class="d-flex pt-2 pl-2">
      <div class="d-flex">
        <span class="fs-xl text mx-2s">人脸抓拍（遵化市）</span>
        <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
      </div>
    </div>
    <div class="renlian">
      <ul>
        <li>
          <p>累计人脸抓拍</p>
          <!--          <br>-->
          <count-to :start-val="0" :end-val="number" :duration="1000" class="card-panel-num" />
          <br>
          <img alt="" style="height: 4rem;width: 100%" src="../../assets/newmap.png">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { getbigData } from '@/api/bigData/dataManagement'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      number: 0
    }
  },
  mounted() {
    const type = 4
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        for (var i = 0; i < res.data.length; i++) {
          this.number += Number(res.data[i].value)
        }
        this.suiji()
      }
    })
  },
  methods: {
    suiji() {
      setInterval(() => {
        this.number += 3
      }, 6000)
    }
  }
}
</script>

<style lang="scss">
#bottomLefts {
  padding: 0.3rem 0.2rem;
  border-radius: 0.0625rem;
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    /*height: 2.125rem;*/
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
  .card-panel-num{
    color: #43fec0;
    font-weight: 600;
  }

}
.renlian{
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 0.35rem;
  padding: 0.2rem;
}
.renlian ul{
  display: flex;
  align-items: center;
  width: 100%;
  padding:0 0 0.3rem 0;
}
.renlian ul li{
  text-align: center;
  width: 100%;
}
.leftImg1Li img{
  width: 0.4rem;
}
</style>
