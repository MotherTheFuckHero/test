<template>
  <div style="text-align: center">
    <img alt="" style="width: 100%;" src="../assets/images/spread.png">
    <p style="margin-bottom: 10%"><a :href="datas.packageUrl"><el-button type="primary" style="font-size: 5vw;padding: 3vw 8vw;border-radius: 10vw;">过来玩</el-button></a></p>
    <div v-if="datas" style="font-size: 3vw;color: #999999;">
      <p>{{ '版本号'+datas.minVersion }}</p>
      <p>{{ '更新时间：'+datas.createdTime }}</p>
      <p style="font-size: 4vw;color: black;font-weight: bold;margin-top: 10%">点击右上角在浏览器里打开..</p>
    </div>

  </div>
</template>

<script>
import { getspread } from '@/api/upload'
export default {
  name: 'Spread',
  data() {
    return {
      datas: ''
    }
  },
  created() {
    this.finishActivity()
  },
  methods: {
    finishActivity() {
      // const ua = navigator.userAgent.toLowerCase()
      // // android终端
      // const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
      // // ios终端
      // const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        console.log(' 我是ios')
        const type = 2
        getspread(type).then(res => {
          if (res.data === undefined) {
            alert('暂无最新安装包')
          } else {
            this.datas = res.data
          }
        })
      } else {
        console.log('我是android')
        const type = 1
        getspread(type).then(res => {
          if (res.data === undefined) {
            alert('暂无最新安装包')
          } else {
            this.datas = res.data
          }
        })
      }
    }
  }
}

</script>

<style scoped>

</style>
