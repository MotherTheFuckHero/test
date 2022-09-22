<template>
  <div style="padding: 0.2rem;text-align: center;font-size: 0.3rem;">

    <dv-decoration-7 style="height:1rem;line-height: 1rem">今日流量</dv-decoration-7>
    <div v-for="(item,index) in valueList" :key="index" style="display: inline-block;font-weight: bold">
      <dv-decoration-9 style="width:1rem;height:2.1rem;line-height: 1rem;margin: 0 0.15rem">{{ item }}</dv-decoration-9>
    </div>
    <div class="card-panel-text" style="height: 1rem;line-height: 1rem">
      当前流量:<count-to :start-val="0" :end-val="value" :duration="1200" class="card-panel-num" />
      总流量:<count-to :start-val="0" :end-val="totalvalue" :duration="2200" class="card-panel-num" />
    </div>
  </div>
</template>

<script>
import { getbigData } from '@/api/bigData/dataManagement'
import CountTo from 'vue-count-to'
export default {
  name: 'RightTop',
  components: {
    CountTo
  },
  data() {
    return {
      valueList: [],
      totalvalue: '',
      value: ''
    }
  },
  mounted() {
    const type = 15
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        this.value = Number(res.data[0].resValue)
        this.totalvalue = Number(res.data[0].value)
        this.valueList = res.data[0].resValue.split('')
      }
    })
  },
  methods: {
  }
}
</script>

<style scoped>
.card-panel-num{
  color:#0396CB;
  font-weight: bold;
  margin: 0 0.2rem;
}
</style>
